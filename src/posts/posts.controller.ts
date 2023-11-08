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
      author: 'newJeans_official',
      title: '뉴진스 민지',
      content: '민지 얼굴',
      likeCount: 11,
      commentCount: 22,
    };
  }
}
