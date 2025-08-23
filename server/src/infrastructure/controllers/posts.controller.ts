import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/application/auth/guard/auth.guard';
import {
  EditPostDto,
  CreatePostDto,
} from 'src/application/posts/dto/posts.dto';
import { PostsService } from 'src/application/posts/services/posts.service';
import { POST_MESSAGES } from 'src/constants/messages.constants';
import { ApiService } from '../services/api.service';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

const { POST_CREATED, POST_EDITED, POST_DELETED } = POST_MESSAGES;

@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(
    private readonly service: PostsService,
    private readonly apiService: ApiService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all posts or search by partial title' })
  async getPosts(
    @Query('query') query: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
    @Request() req,
  ) {
    const posts = query
      ? await this.service.search(query, page, limit, req.user.id)
      : await this.service.getAll(page, limit, req.user.id);

    return this.apiService.buildResponse(POST_MESSAGES.POSTS_FOUND, posts);
  }

  @Get('/author/:author_id')
  @ApiOperation({ summary: 'Get posts by author ID' })
  async getPostsByAuthorId(
    @Param('author_id') author_id: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Request() req,
  ) {
    const posts = await this.service.getByAuthorId(
      author_id,
      limit,
      page,
      req.user.id,
    );
    return this.apiService.buildResponse(POST_MESSAGES.POSTS_FOUND, posts);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiBody({ type: CreatePostDto })
  async createPost(@Request() req, @Body() body: CreatePostDto) {
    const created = await this.service.create(req.user.id, body.content);
    return this.apiService.buildResponse(POST_CREATED, created);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit a post' })
  @ApiBody({ type: EditPostDto })
  async editPost(
    @Request() req,
    @Param('id') id: string,
    @Body() body: EditPostDto,
  ) {
    await this.service.edit(id, req.user.id, body.new_content);
    return this.apiService.buildResponse(POST_EDITED);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post' })
  async deletePost(@Request() req, @Param('id') id: string) {
    await this.service.delete(id, req.user.id);
    return this.apiService.buildResponse(POST_DELETED);
  }
}
