import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Article } from './entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async create(createArticle: Article): Promise<Article> {
    const newArticle = await this.articleRepository.create(createArticle);
    return this.articleRepository.save(newArticle);
  }

  async findAll(): Promise<Article[]> {
    return this.articleRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<Article> {
    const articleData = await this.articleRepository.findOneBy({ id });
    if (!articleData) {
      throw new NotFoundException('Article Not Found');
    }
    return articleData;
  }

  async update(id: number, updateArticle: Article): Promise<Article> {
    const articleData = await this.articleRepository.findOneBy({ id });
    if (!articleData) {
      throw new NotFoundException('Article Not Found');
    }
    await this.articleRepository.update(id, updateArticle);
    return await this.articleRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<Article> {
    const articleData = await this.articleRepository.findOneBy({ id });
    if (!articleData) {
      throw new NotFoundException('User not found');
    }
    return await this.articleRepository.remove(articleData);
  }
}
