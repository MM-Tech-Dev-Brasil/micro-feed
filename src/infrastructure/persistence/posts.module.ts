import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '../../domain/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  providers: [],
  exports: [TypeOrmModule],
})
export class PostsModule {}
