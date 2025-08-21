import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { ProfilesService } from 'src/application/profiles/services/profiles.service';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly profilesService: ProfilesService) {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new UnauthorizedException('JWT secret not defined');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: any) {
    const user = await this.profilesService.getById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
