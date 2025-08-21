import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from 'src/application/auth/dto/auth.dto';
import { ProfileEntity } from 'src/domain/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly repository: Repository<ProfileEntity>,
  ) {}

  async getById(id: string) {
    const user = await this.repository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async getByUsername(username: string) {
    return await this.repository.findOne({
      where: { username },
    });
  }

  async create(data: RegisterDto) {
    const profile = this.repository.create({
      username: data.username,
      password_hash: data.password,
    });
    return this.repository.save(profile);
  }
}
