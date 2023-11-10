import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostsModel } from './entities/posts.entity';

export interface PostModel {
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

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsModel)
    private readonly postsRepository: Repository<PostModel>,
  ) {}
  async getAllPost() {
    return this.postsRepository.find();
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
    });
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

  createPost(author: string, title: string, content: string) {
    const post: PostModel = {
      id: posts[posts.length - 1].id + 1,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    };
    posts = [...posts, post];
    return post;
  }

  updatePost(postId: number, author: string, title: string, content: string) {
    const post = posts.find((post) => post.id === postId);

    if (!post) {
      throw new NotFoundException();
    }
    if (author) {
      post.author = author;
    }
    if (title) {
      post.title = title;
    }
    if (content) {
      post.content = content;
    }
    posts = posts.map((prevPost) => (prevPost.id === postId ? post : prevPost));
    return post;
  }

  deletePost(postId: number) {
    posts = posts.filter((post) => post.id !== postId);
    if (!posts) {
      throw new NotFoundException();
    }
    return posts;
  }
}
