import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ARTICLE_UNIT } from './enum/ARTICLE_UNIT';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'article_name', nullable: false })
  article_name: string;

  @Column({ name: 'article_description' })
  article_description: string;

  @Column({ name: 'article_type' })
  article_type: boolean;

  @Column({ name: 'article_price' })
  article_price: number;

  @Column({ name: 'article_currency' })
  article_currency: string;

  @Column({ name: 'article_tax' })
  article_tax: number;

  @Column({
    type: 'enum',
    name: 'article_unit',
    enum: ARTICLE_UNIT,
    default: ARTICLE_UNIT.QUANTITY,
  })
  article_unit: string;

  @Column({ name: 'article_picture', nullable: true })
  article_picture: string;

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
