import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/domain/post.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly repository: Repository<PostEntity>,
  ) {}

  private addLikeStatus(posts: PostEntity[], currentUserId?: string) {
    return posts.map((post) => {
      const userLike = currentUserId
        ? post.likes.find((like) => like.user_id === currentUserId)
        : null;

      return {
        ...post,
        like_by_current_user: userLike ? userLike.id : null,
        liked_by_current_user: !!userLike,
        likes_count: post.likes.length,
        likes: undefined,
        username: post.profile.username,
      };
    });
  }

  async search(
    partial: string,
    page: number,
    limit: number,
    currentUserId?: string,
  ) {
    const posts = await this.repository.find({
      where: { content: Like(`%${partial}%`) },
      relations: ['likes', 'profile'],
      order: { created_at: 'DESC' },
      take: limit,
      skip: (page - 1) * limit,
    });

    return this.addLikeStatus(posts, currentUserId);
  }

  async getAll(page: number, limit: number, currentUserId?: string) {
    const posts = await this.repository.find({
      order: { created_at: 'DESC' },
      relations: ['likes', 'profile'],
      take: limit,
      skip: (page - 1) * limit,
    });

    return this.addLikeStatus(posts, currentUserId);
  }

  async getByAuthorId(
    author_id: string,
    limit: number,
    page: number,
    currentUserId?: string,
  ) {
    const posts = await this.repository.find({
      where: { author_id },
      relations: ['likes', 'profile'],
      order: { created_at: 'DESC' },
      take: limit,
      skip: (page - 1) * limit,
    });

    return this.addLikeStatus(posts, currentUserId);
  }

  async create(author_id: string, content: string) {
    const created = this.repository.create({ author_id, content });
    return await this.repository.save(created);
  }

  async edit(id: string, author_id: string, content: string) {
    const post = await this.repository.findOneBy({ id });

    if (!post) throw new NotFoundException('Post not found');
    if (post.author_id !== author_id)
      throw new UnauthorizedException('You are not the author of this post');

    return await this.repository.update(id, { content });
  }

  async delete(id: string, author_id: string) {
    const post = await this.repository.findOneBy({ id });

    if (!post) throw new NotFoundException('Post not found');
    if (post.author_id !== author_id)
      throw new UnauthorizedException('You are not the author of this post');

    return await this.repository.delete(id);
  }
}
