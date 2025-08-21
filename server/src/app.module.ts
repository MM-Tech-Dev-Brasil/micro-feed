import { ApiService } from './infrastructure/services/api.service';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { AuthService } from './application/auth/services/auth.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './application/auth/strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ProfileEntity } from './domain/profile.entity';
import { ProfilesModule } from './infrastructure/persistence/profiles.module';
import { ProfilesService } from './application/profiles/services/profiles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './domain/post.entity';
import { LikeEntity } from './domain/like.entity';
import { PostsModule } from './infrastructure/persistence/posts.module';
import { LikesModule } from './infrastructure/persistence/likes.module';
import { PostsController } from './infrastructure/controllers/posts.controller';
import { LikesController } from './infrastructure/controllers/likes.controller';
import { PostsService } from './application/posts/services/posts.service';
import { LikesService } from './application/likes/services/likes.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || '5432'),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [PostEntity, LikeEntity, ProfileEntity],
      synchronize: false, // Do not use in production
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    PostsModule,
    LikesModule,
    ProfilesModule,
  ],
  controllers: [PostsController, LikesController, AuthController],
  providers: [
    PostsService,
    LikesService,
    AuthService,
    ProfilesModule,
    JwtStrategy,
    ApiService,
    ProfilesService,
  ],
})
export class AppModule {}
