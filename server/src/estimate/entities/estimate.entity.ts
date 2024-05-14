import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Estimate {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ name: 'estimate_reference' })
  estimate_reference: string;

  @ApiProperty()
  @Column({ name: 'estimate_date' })
  estimate_date: Date;

  @ApiProperty()
  @Column({ name: 'estimate_expiary_date' })
  estimate_expiary_date: Date;

  @ApiProperty()
  @Column({ name: 'estimate_currency' })
  estimate_currency: string;

  @ApiProperty()
  @Column({ name: 'estimate_image' })
  estimate_image: string;

  @ApiProperty()
  @Column({ name: 'estimate_total' })
  estimate_total: number;

  @ApiProperty()
  @Column({ name: 'estimate_subtotal' }) // price before tax and discount
  estimate_subtotal: number;

  @ApiProperty()
  @Column({ name: 'estimate_discount' })
  estimate_discount: number;

  @ApiProperty()
  @Column({ name: 'estimate_total_amount' })
  estimate_total_amount: number;

  @ApiProperty()
  @Column({ name: 'estimate_description' })
  estimate_description: string;

  @ApiProperty()
  @Column({ name: 'estimate_status' })
  estimate_status: boolean;

  @ApiProperty()
  @Column({ name: 'estimate_template_name' })
  estimate_template_name: string;
}
