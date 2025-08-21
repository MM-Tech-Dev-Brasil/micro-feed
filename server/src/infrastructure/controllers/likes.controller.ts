import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/application/auth/guard/auth.guard';
import { LikeDto } from 'src/application/likes/dto/likes.dto';
import { LikesService } from 'src/application/likes/services/likes.service';
import { ApiService } from '../services/api.service';
import { LIKE_MESSAGES } from 'src/constants/messages.constants';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

const { LIKE_CREATED, LIKE_DELETED } = LIKE_MESSAGES;

@UseGuards(JwtAuthGuard)
@Controller('likes')
@ApiTags('Posts likes')
export class LikesController {
  constructor(
    private readonly service: LikesService,
    private readonly apiService: ApiService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a like for a post',
  })
  async createLike(@Request() req, @Body() body: LikeDto) {
    await this.service.create(body.post_id, req.user.id);
    return this.apiService.buildResponse(LIKE_CREATED);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a like of a post',
  })
  async deleteLike(@Request() req, @Param('id') id: string) {
    await this.service.delete(id, req.user.id);
    return this.apiService.buildResponse(LIKE_DELETED);
  }
}
