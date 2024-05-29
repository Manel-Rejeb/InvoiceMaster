import { ApiProperty } from '@nestjs/swagger';
import { Estimate } from 'src/estimate/entities/estimate.entity';
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
  @Column({ name: 'item_name' })
  item_name: string;

  @ApiProperty()
  @Column({ name: 'item_reference' })
  item_sous_total: string;

  @ApiProperty()
  @Column({ name: 'item_price', type: 'float' })
  item_price: number;

  @ApiProperty()
  @Column({ name: 'item_unit' })
  item_unit: string;

  @ApiProperty()
  @Column({ name: 'item_quantity' })
  item_quantity: number;

  @ApiProperty()
  @Column({ name: 'item_tax' })
  item_tax: number;

  @ApiProperty()
  @Column({ name: 'item_discount', type: 'float' })
  item_discount: number;

  @ApiProperty()
  @Column({ name: 'item_discount_type', type: 'bool' })
  item_discount_type: boolean;

  //establish the relationship between the item and the invoice(many-to-one)
  @ApiProperty({ type: () => Estimate })
  @ManyToOne(() => Estimate, (estimate) => estimate.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  estimate: Estimate;
}
