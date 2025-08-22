import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @ApiProperty({ example: 'captain.america@marvel.com' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'marvel123' })
  password: string;
}

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Captain America' })
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ example: 'marvel123' })
  password: string;
}
