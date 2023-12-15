import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { ChatsGateway } from 'src/chats/chats.gateway';

@Module({
    controllers: [ChatsController],
    providers: [ChatsGateway, ChatsService],
})
export class ChatsModule {}
