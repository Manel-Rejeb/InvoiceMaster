import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ name: 'item_name' })
  item_name: string;

  @ApiProperty()
  @Column({ name: 'item_price' })
  item_price: number;

  @ApiProperty()
  @Column({ name: 'item_unit' })
  item_unit: string;

  @ApiProperty()
  @Column({ name: 'item_sous_total' })
  item_sous_total: number;

  @ApiProperty()
  @Column({ name: 'item_tatal' })
  item_total: number;
}
