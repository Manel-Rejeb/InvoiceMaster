import { ApiProperty } from '@nestjs/swagger';

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Estimate } from 'src/estimate/entities/estimate.entity';
import { INVOICE_STATUS } from './enum/INVOICE_STATUS';

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
  @Column({ name: 'invoice_amount', type: 'float' })
  invoice_amount: number;

  @ApiProperty()
  @Column({ name: 'invoice_amount_paid', type: 'float' })
  invoice_amount_paid: number;

  @ApiProperty()
  @Column({ name: 'invoice_amount_remaining', type: 'float' })
  invoice_amount_remaining: number;

  @ApiProperty()
  @Column({
    name: 'Payment_status',
    type: 'enum',
    enum: INVOICE_STATUS,
    default: INVOICE_STATUS.UNPAID,
  })
  invoice_payment_status: string;

  @ApiProperty({ type: () => Estimate })
  @OneToOne(() => Estimate, (estimate) => estimate.invoice, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  estimate: Estimate;
}
