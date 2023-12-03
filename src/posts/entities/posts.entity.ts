import { IsString } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from '../../common/entity/base.entity';
import { stringValidationMessage } from '../../common/validation-message/string-validation.message';
import { UsersModel } from '../../users/entities/users.entity';

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
  image?: string;

  @Column()
  likeCount: number;

  @Column()
  commentCount: number;
}
