import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateChatDto } from 'src/chats/dto/create-chat.dto';
import { ChatsService } from 'src/chats/chats.service';
import { EnterChatDto } from 'src/chats/dto/enter-chat.dto';
import { CreateMessagesDto } from 'src/chats/messages/dto/create-messages.dto';
import { ChatsMessageService } from 'src/chats/messages/messages.service';
import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { SocketCatchHttpExceptionFilter } from 'src/common/exception-filter/socket-catch-http.exception-filter';

@WebSocketGateway({
    // ws://localhost:3000/chats
    namespace: 'chats',
})
export class ChatsGateway implements OnGatewayConnection {
    constructor(
        private readonly chatsService: ChatsService,
        private readonly messageService: ChatsMessageService,
    ) {}

    @WebSocketServer()
    server: Server;

    handleConnection(socket: Socket) {
        console.log(`on connect called : ${socket.id}`);
    }

    @UsePipes(
        new ValidationPipe({
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    )
    @UseFilters(SocketCatchHttpExceptionFilter)
    @SubscribeMessage('create_chat')
    async createChat(
        @MessageBody() data: CreateChatDto,
        @ConnectedSocket() socket: Socket,
    ) {
        const chat = await this.chatsService.createChat(data);
    }

    @SubscribeMessage('enter_chat')
    async enterChat(
        // 방의 chat ID 들을 리스트로 받는다.
        @MessageBody()
        data: EnterChatDto,
        @ConnectedSocket()
        socket: Socket,
    ) {
        for (const chatid of data.chatIds) {
            const exists = await this.chatsService.checkIfChatExists(chatid);

            if (!exists) {
                throw new WsException({
                    code: 100,
                    message: `존재하지 않는 chat 입니다. chatid: ${chatid}`,
                });
            }
        }
        socket.join(data.chatIds.map((x) => x.toString()));
    }

    @SubscribeMessage('send_message')
    async sendMesssage(
        @MessageBody() dto: CreateMessagesDto,
        @ConnectedSocket()
        socket: Socket,
    ) {
        const chatExists = await this.chatsService.checkIfChatExists(
            dto.chatId,
        );
        if (!chatExists) {
            throw new WsException(
                `존재하지 않는 채팅방입니다. Chat ID : ${dto.chatId}`,
            );
        }

        const message = await this.messageService.createMessage(dto);

        socket
            .to(message.chat.id.toString())
            .emit('receive_message', dto.message);
    }
}
