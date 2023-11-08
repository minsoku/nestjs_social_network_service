import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { PostsService } from './posts.service';

interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

let posts: PostModel[] = [
  {
    id: 1,
    author: 'minsoku1',
    title: 'minsoku title1',
    content: 'minsoku content1',
    likeCount: 111,
    commentCount: 111,
  },
  {
    id: 2,
    author: 'minsoku2',
    title: 'minsoku title2',
    content: 'minsoku content2',
    likeCount: 222,
    commentCount: 222,
  },
  {
    id: 3,
    author: 'minsoku3',
    title: 'minsoku title3',
    content: 'minsoku content3',
    likeCount: 333,
    commentCount: 333,
  },
];

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  // 1) GET /posts
  //    모든 post를 다 가져온다.
  @Get()
  getPosts() {
    return posts;
  }
  // 2) GET /posts/:id
  //    id에 해당되는 post를 가져온다.
  //    ex) id=1일 경우 id가 1인 포스트를 가져온다.
  @Get(':id')
  getPost(@Param('id') id: string) {
    const post = posts.find((post) => post.id === +id);
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }
  // 3) POST /posts
  //    POST를 생서한다.

  // 4) PUT /posts/:id
  //    id에 해당되는 POST를 변경한다.

  // 5) DELETE /posts/:id
  //    id에 해당되는 POST를 삭제한다.
}
