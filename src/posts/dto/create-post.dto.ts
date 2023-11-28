import { PickType } from '@nestjs/mapped-types';
import { PostsModel } from '../entities/posts.entity';

// DTO - Data Transfer Object
// Pick, Omit, Patial -> type 반환
// PickType, OmitType, ParitalType -> value 반환
export class CreatePostDto extends PickType(PostsModel, ['title', 'content']) {}
