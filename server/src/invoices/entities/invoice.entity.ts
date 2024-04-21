import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
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
  @Column({ name: 'invoice_receiver_name' })
  invoice_receiver_name: string;

  @ApiProperty()
  @Column({ name: 'invoice_receiver_address' })
  invoice_receiver_address: string;

  @ApiProperty()
  @Column({ name: 'invoice_receiver_post' })
  invoice_receiver_post: string;

  @ApiProperty()
  @Column({ name: 'invoice_receiver_tax_number' })
  invoice_receiver_tax_number: string;

  @ApiProperty()
  @Column({ name: 'invoice_sender_name' })
  invoice_sender_name: string;

  @ApiProperty()
  @Column({ name: 'invoice_sender_address' })
  invoice_sender_address: string;

  @ApiProperty()
  @Column({ name: 'invoice_sender_post' })
  invoice_sender_post: string;

  @ApiProperty()
  @Column({ name: 'invoice_sender_tax_number' })
  invoice_sender_tax_number: string;

  @ApiProperty()
  @Column({ name: 'invoice_tva', type: 'boolean' })
  invoice_tva: boolean;

  @ApiProperty()
  @Column({ name: 'invoice_tva_value' })
  invoice_tva_value: number;

  @ApiProperty()
  @Column({ name: 'total_price' })
  invoice_total: number;

  @ApiProperty()
  @Column({ name: 'price_hors_tax' })
  invoice_price_hors_tax: number;

  @ApiProperty()
  @Column({ name: 'invoice_status' })
  invoice_status: string;

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
}
