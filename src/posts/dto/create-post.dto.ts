import { PickType } from '@nestjs/mapped-types';
import { PostsModel } from '../entities/posts.entity';
import { IsOptional, IsString } from 'class-validator';

// DTO - Data Transfer Object
// Pick, Omit, Patial -> type 반환
// PickType, OmitType, ParitalType -> value 반환
export class CreatePostDto extends PickType(PostsModel, ['title', 'content']) {
  @IsString({
    // 안에 내용이 모두 string인지 검증해야 한다는 의미
    each: true,
  })
  @IsOptional()
  images: string[] = [];
}
