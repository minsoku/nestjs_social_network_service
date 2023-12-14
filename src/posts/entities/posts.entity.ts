import { IsString } from 'class-validator';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from 'src/common/entity/base.entity';
import { UsersModel } from 'src/users/entities/users.entity';
import { stringValidationMessage } from 'src/common/validation-message/string-validation.message';
import { ImageModel } from 'src/common/entity/image.entity';

@Entity()
export class PostsModel extends BaseModel {
    // 1) UsersModel과 연동 Foreign key를 이용
    // 2) null이 될 수 없음
    @ManyToOne(() => UsersModel, (user) => user.posts, {
        nullable: false,
    })
    author: UsersModel;

    @Column()
    @IsString({
        message: stringValidationMessage,
    })
    title: string;

    @Column()
    @IsString({
        message: stringValidationMessage,
    })
    content: string;

    @Column({
        nullable: true,
    })
    @Column()
    likeCount: number;

    @Column()
    commentCount: number;

    @OneToMany('ImageModel', 'post')
    images: ImageModel[];
}
