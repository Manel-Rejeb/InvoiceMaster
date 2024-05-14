import { ApiProperty } from '@nestjs/swagger';
import { ARTICLE_UNIT } from 'src/articles/entities/enum/ARTICLE_UNIT';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    name: 'expense_name',
    nullable: false,
  })
  expense_name: string;

  @ApiProperty()
  @Column({
    name: 'expense_description',
  })
  expense_description: string;

  @ApiProperty()
  @Column({ name: 'expense_type' })
  expense_type: boolean;

  @ApiProperty()
  @Column({
    name: 'expense_buy_price',
  })
  expense_buy_price: number;

  @ApiProperty()
  @Column({
    name: 'expense_sell_price',
  })
  expense_sell_price: number;

  @ApiProperty()
  @Column({ name: 'expense_currency' })
  expense_currency: string;

  @ApiProperty()
  @Column({ name: 'expense_tax' })
  expense_tax: number;

  @ApiProperty()
  @Column({
    type: 'enum',
    name: 'expense_unit',
    enum: ARTICLE_UNIT,
    default: ARTICLE_UNIT.QUANTITY,
  })
  expense_unit: string;

  @ApiProperty()
  @Column({ name: 'expense_picture', nullable: true })
  expense_picture: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;

  @Column({
    name: 'isSoftDelete',
    default: false,
  })
  isSoftDelete?: boolean;

  //Establishing a relationship between the Article and the Category entities
}
