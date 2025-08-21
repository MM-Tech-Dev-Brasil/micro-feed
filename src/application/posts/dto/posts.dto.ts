import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(280)
  content: string;
}

export class EditPostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(280)
  new_content: string;
}
