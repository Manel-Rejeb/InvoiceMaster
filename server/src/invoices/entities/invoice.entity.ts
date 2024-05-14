import { ApiProperty } from '@nestjs/swagger';
import { Article } from 'src/articles/entities/article.entity';
import { Customer } from 'src/customers/entities/customer.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ name: 'invoice_reference' })
  invoice_reference: string;

  @ApiProperty()
  @Column({ name: 'invoice_date' })
  invoice_date: Date;

  @ApiProperty()
  @Column({ name: 'invoice_due_date' })
  invoice_due_date: Date;

  @ApiProperty()
  @Column({ name: 'invoice_currency' })
  invoice_currency: string;

  @ApiProperty()
  @Column({ name: 'invoice_image' })
  invoice_image: string;

  @ApiProperty()
  @Column({ name: 'tampon_signature' })
  tampon_signature: string;

  @ApiProperty()
  @Column({ name: 'invoice_tva', type: 'boolean' })
  invoice_tva: boolean;

  @ApiProperty()
  @Column({ name: 'Payment_status' })
  invoice_tva_value: number;

  @ApiProperty()
  @Column({ name: 'total_price' })
  invoice_total: number;

  @ApiProperty()
  @Column({ name: 'subtotal' }) // price before tax and discount
  invoice_subtotal: number;

  @ApiProperty()
  @Column({ name: 'discount' })
  invoice_discount: number;

  @ApiProperty()
  @Column({ name: 'total_amount' })
  invoice_total_amount: number;

  @ApiProperty()
  @Column({ name: 'invoice_description' })
  invoice_description: string;

  @ApiProperty()
  @Column({ name: 'invoice_payment_method' })
  invoice_payment_method: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;

  @ApiProperty({ type: Article })
  @OneToMany(() => Article, (article) => article.invoice, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  article: Article[];

  @ApiProperty({ type: Customer })
  @ManyToOne(() => Customer, (customer) => customer.invoices)
  @JoinColumn()
  customer: Customer;
}
