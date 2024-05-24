import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './entities/article.entity';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public.decorator';

@Public() // just for testing purposes
@ApiTags('article')
@Controller('api/article')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() createArticle: Article) {
    return this.articlesService.create(createArticle);
  }

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticle: Article) {
    return this.articlesService.update(+id, updateArticle);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
