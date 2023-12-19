import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsEmail, IsString, Length } from 'class-validator';
import { BaseModel } from 'src/common/entity/base.entity';
import { stringValidationMessage } from 'src/common/validation-message/string-validation.message';
import { lengthValidationMessage } from 'src/common/validation-message/length-validation.message';
import { emailValidationMessage } from 'src/common/validation-message/email-validation.message';
import { RolesEnum } from 'src/users/const/roles.const';
import { PostsModel } from 'src/posts/entities/posts.entity';
import { ChatsModel } from 'src/chats/entity/chats.entity';

@Entity()
export class UsersModel extends BaseModel {
    @Column({
        length: 20,
        unique: true,
    })
    @IsString({
        message: stringValidationMessage,
    })
    @Length(1, 20, {
        message: lengthValidationMessage,
    })
    // 1) 길이가 20을 넘지 않을 것
    // 2) 유일무이한 값이 될 것
    nickname: string;

    @Column({
        unique: true,
    })
    @IsString({
        message: stringValidationMessage,
    })
    @IsEmail({}, { message: emailValidationMessage })
    // 1) 유일무이한 값이 될 것
    email: string;

    @Column()
    @IsString({
        message: stringValidationMessage,
    })
    @Length(3, 8, {
        message: lengthValidationMessage,
    })
    /**
     * Request
     * frontend -> backend
     * plain object (JSON) -> class instance (dto)
     *
     * Response
     * backend -> frontend
     * class instance (dto) -> plain object (JSON)
     *
     * toClassOnly -> class instance 변환 될 때만
     * toPlainOnly -> plain object로 변활 될 때만
     */
    @Exclude({
        toPlainOnly: true,
    })
    password: string;

    @Column({
        // enum: Object.values(RolesEnum),
        type: 'varchar',
        default: RolesEnum.USER,
    })
    role: RolesEnum;

    @OneToMany(() => PostsModel, (post) => post.author)
    posts: PostsModel[];

    @ManyToMany(() => ChatsModel, (chat) => chat.users)
    @JoinTable()
    chats: ChatsModel[];
}
