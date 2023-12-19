import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ChatsMessageService } from 'src/chats/messages/messages.service';
import { BasePaginationDto } from 'src/common/dto/base-pagination.dto';

@Controller('chats/:cid/messages')
export class MessagesController {
    constructor(private readonly messagesService: ChatsMessageService) {}

    @Get()
    paginateMessage(
        @Param('cid', ParseIntPipe) id: number,
        @Query() dto: BasePaginationDto,
    ) {
        return this.messagesService.paginateMessages(dto, {
            where: {
                chat: {
                    id,
                },
            },
            relations: {
                author: true,
                chat: true,
            },
        });
    }
}
