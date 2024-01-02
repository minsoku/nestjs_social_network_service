import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { ChatsGateway } from 'src/chats/chats.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsModel } from 'src/chats/entity/chats.entity';
import { CommonModule } from 'src/common/common.module';
import { ChatsMessageService } from 'src/chats/messages/messages.service';
import { MessagesModel } from 'src/chats/messages/entity/messages.entity';
import { MessagesController } from 'src/chats/messages/messages.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ChatsModel, MessagesModel]),
        CommonModule,
        AuthModule,
        UsersModule,
    ],
    controllers: [ChatsController, MessagesController],
    providers: [ChatsGateway, ChatsService, ChatsMessageService],
})
export class ChatsModule {}
