import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(280)
  @ApiProperty({ example: 'This is a content example' })
  content: string;
}

export class EditPostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(280)
  @ApiProperty({ example: 'This is a new content example' })
  new_content: string;
}
