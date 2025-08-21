import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LikeEntity } from 'src/domain/like.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly repository: Repository<LikeEntity>,
  ) {}

  async create(post_id: string, user_id: string) {
    const like = await this.repository.findOneBy({ post_id, user_id });
    if (like) throw new ConflictException('You already liked this post');

    const created = this.repository.create({ post_id, user_id });
    return this.repository.save(created);
  }

  async delete(id: string, user_id: string) {
    const like = await this.repository.findOneBy({ id, user_id });
    if (!like) throw new NotFoundException('Like not found');

    return this.repository.delete(id);
  }
}
