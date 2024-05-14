import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { ARTICLE_UNIT } from './enum/ARTICLE_UNIT';
import { ApiProperty } from '@nestjs/swagger';
import { Invoice } from 'src/invoices/entities/invoice.entity';
import { Customer } from 'src/customers/entities/customer.entity';

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
  @Column({ name: 'article_type' })
  article_type: boolean;

  @ApiProperty()
  @Column({ name: 'article_price' })
  article_price: number;

  @ApiProperty()
  @Column({ name: 'article_currency' })
  article_currency: string;

  @ApiProperty()
  @Column({ name: 'article_tax' })
  article_tax: number;

  @ApiProperty()
  @Column({
    type: 'enum',
    name: 'article_unit',
    enum: ARTICLE_UNIT,
    default: ARTICLE_UNIT.QUANTITY,
  })
  article_unit: string;

  @ApiProperty()
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

  @ApiProperty({ type: Invoice })
  @ManyToOne(() => Invoice, (invoice) => invoice.article)
  @JoinColumn()
  invoice: Invoice;

  @ApiProperty({ type: Customer })
  @ManyToOne(() => Customer, (customer) => customer.article, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  customer: Customer;
}
