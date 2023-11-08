import { Controller, Get } from '@nestjs/common';
import { PostsService } from './posts.service';

interface Post {
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get()
  getPost(): Post {
    return {
      author: 'author',
      title: 'title',
      content: 'content',
      likeCount: 11,
      commentCount: 22,
    };
  }
}
