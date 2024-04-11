import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Customer } from './customer.entity';

@Entity()
export class IndividualCustomer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  first_name: string;

  @Column({ name: 'last_name' })
  last_name: string;

  @OneToOne(() => Customer, (customer) => customer.individual)
  @JoinColumn()
  customer: Customer;
}
