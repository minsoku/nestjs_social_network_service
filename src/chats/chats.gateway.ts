import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateChatDto } from 'src/chats/dto/create-chat.dto';
import { ChatsService } from 'src/chats/chats.service';

@WebSocketGateway({
    // ws://localhost:3000/chats
    namespace: 'chats',
})
export class ChatsGateway implements OnGatewayConnection {
    constructor(private readonly chatsService: ChatsService) {}

    @WebSocketServer()
    server: Server;

    handleConnection(socket: Socket) {
        console.log(`on connect called : ${socket.id}`);
    }

    @SubscribeMessage('create_chat')
    async createChat(
        @MessageBody() data: CreateChatDto,
        @ConnectedSocket() socket: Socket,
    ) {
        const chat = await this.chatsService.createChat(data);
    }

    @SubscribeMessage('enter_chat')
    enterChat(
        // 방의 chat ID 들을 리스트로 받는다.
        @MessageBody()
        data: number[],
        @ConnectedSocket()
        socket: Socket,
    ) {
        for (const chatId of data) {
            socket.join(chatId.toString());
        }
    }

    @SubscribeMessage('send_message')
    sendMesssage(
        @MessageBody()
        message: {
            message: string;
            chatId: number;
        },
        @ConnectedSocket()
        socket: Socket,
    ) {
        socket
            .to(message.chatId.toString())
            .emit('receive_message', message.message);
        // this.server
        //     .in(message.chatId.toString())
        //     .emit('receive_message', message.message);
    }
}
