import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ARTICLE_UNIT } from './enum/ARTICLE_UNIT';
import { ApiProperty } from '@nestjs/swagger';
import { ARTICLE_TYPE } from './enum/ARTICLE_TYPE';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ name: 'article_name', nullable: false })
  article_name: string;

  @ApiProperty()
  @Column({ name: 'article_description' })
  article_description: string;

  @ApiProperty()
  @Column({ name: 'article_price', type: 'float' })
  article_price: number;

  @ApiProperty()
  @Column({ name: 'article_currency' })
  article_currency: string;

  @ApiProperty()
  @Column({
    name: 'article_type',
    type: 'enum',
    enum: ARTICLE_TYPE,
    default: ARTICLE_TYPE.SERVICE,
  })
  article_type: string;

  @ApiProperty()
  @Column({ name: 'article_tax_enabled', default: false })
  article_tax_enabled: boolean;

  @ApiProperty()
  @Column({
    type: 'enum',
    name: 'article_unit',
    enum: ARTICLE_UNIT,
    default: ARTICLE_UNIT.QUANTITY,
  })
  article_unit: string;

  @ApiProperty()
  @Column({ name: 'article_buy_price', type: 'float', nullable: true })
  article_buy_price?: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;

  @Column({
    name: 'isSoftDelete',
    default: false,
  })
  isSoftDelete?: boolean;
}
