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

  async search(partial: string, page: number, limit: number) {
    return await this.repository.find({
      where: { content: Like(`%${partial}%`) },
      order: { created_at: 'DESC' },
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  async getAll(page: number, limit: number) {
    return await this.repository.find({
      order: { created_at: 'DESC' },
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  async getByAuthorId(author_id: string, limit: number, page: number) {
    return await this.repository.find({
      where: { author_id },
      order: { created_at: 'DESC' },
      take: limit,
      skip: (page - 1) * limit,
    });
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
