import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeEntity } from 'src/domain/like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LikeEntity])],
  providers: [],
  exports: [TypeOrmModule],
})
export class LikesModule {}
