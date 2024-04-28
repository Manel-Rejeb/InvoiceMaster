import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class IndividualCustomer {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ name: 'first_name' })
  first_name: string;

  @ApiProperty()
  @Column({ name: 'last_name' })
  last_name: string;

  @OneToOne(() => Customer, (customer) => customer.individual, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  customer: Customer;
}
