import { ApiProperty } from '@nestjs/swagger';

import { Estimate } from 'src/estimate/entities/estimate.entity';
import { Article } from 'src/articles/entities/article.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ name: 'item_price', type: 'float' })
  item_price: number;

  @ApiProperty()
  @Column({ name: 'item_quantity' })
  item_quantity: number;

  @ApiProperty()
  @Column({ name: 'item_tax' })
  item_tax: number;

  //establish the relationship between the item and the invoice(many-to-one)
  @ApiProperty({ type: () => Estimate })
  @ManyToOne(() => Estimate, (estimate) => estimate.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  estimate: Estimate;

  //establish the relationship between the item and the articles(many-to-one)
  @ApiProperty({ type: () => Article })
  @ManyToOne(() => Article)
  @JoinColumn()
  article: Article;
}
