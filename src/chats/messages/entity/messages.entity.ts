import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ChatsModel } from 'src/chats/entity/chats.entity';
import { UsersModel } from 'src/users/entities/users.entity';
import { IsString } from 'class-validator';

@Entity()
export class MessagesModel extends BaseModel {
    @ManyToOne(() => ChatsModel, (chat) => chat.messages)
    chat: ChatsModel;

    @ManyToOne(() => UsersModel, (user) => user.messages)
    author: UsersModel;

    @Column()
    @IsString()
    message: string;
}
