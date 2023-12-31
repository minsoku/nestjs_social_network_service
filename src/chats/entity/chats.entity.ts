import { Entity, ManyToMany, OneToMany } from 'typeorm';
import { BaseModel } from 'src/common/entity/base.entity';
import { UsersModel } from 'src/users/entities/users.entity';
import { MessagesModel } from 'src/chats/messages/entity/messages.entity';

@Entity()
export class ChatsModel extends BaseModel {
    @ManyToMany(() => UsersModel, (user) => user.chats)
    users: UsersModel[];

    @OneToMany(() => MessagesModel, (message) => message.chat)
    messages: MessagesModel;
}
