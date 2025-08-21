import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from '../dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { ProfilesService } from 'src/application/profiles/services/profiles.service';
import { ProfileEntity } from 'src/domain/profile.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly profilesService: ProfilesService,
    private readonly jwtService: JwtService,
  ) {}

  async validateProfile(body: LoginDto) {
    const profile = await this.profilesService.getByUsername(body.username);
    if (!profile) throw new NotFoundException('User not found');

    const isValid = await bcrypt.compare(body.password, profile.password_hash);
    return isValid ? profile : null;
  }

  login(user: ProfileEntity) {
    const { id: sub, username } = user;

    return {
      access_token: this.jwtService.sign(
        { sub, username },
        { expiresIn: '1d' },
      ),
    };
  }

  async register(data: RegisterDto) {
    const profile = await this.profilesService.getByUsername(data.username);
    if (profile) throw new ConflictException('Username already exists');

    const password = await bcrypt.hash(data.password, 12);
    return this.profilesService.create({ ...data, password });
  }
}
