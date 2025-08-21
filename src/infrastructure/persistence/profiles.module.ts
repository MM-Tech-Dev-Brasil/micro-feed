import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from 'src/domain/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity])],
  providers: [],
  exports: [TypeOrmModule],
})
export class ProfilesModule {}
