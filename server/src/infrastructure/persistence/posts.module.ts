import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '../../domain/post.entity';
import { PostsService } from 'src/application/posts/services/posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  providers: [PostsService],
  exports: [TypeOrmModule, PostsService],
})
export class PostsModule {}
