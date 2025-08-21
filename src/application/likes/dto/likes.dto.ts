import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class LikeDto {
  @IsUUID()
  @ApiProperty({ example: 'c68fb822-f92c-4a37-bef5-42cc45173b00' })
  post_id: string;
}
