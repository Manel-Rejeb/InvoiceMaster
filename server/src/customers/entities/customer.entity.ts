import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { IndividualCustomer } from './individual.entity';
import { CorporateCustomer } from './corporation.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'customer_type', type: 'boolean', default: true })
  type_customer: boolean;

  @Column({ name: 'customer_number' })
  customer_number: string;

  @Column({ name: 'customer_country' })
  customer_country: string;

  @Column({ name: 'customer_city' })
  customer_city: 'string';

  @Column({ name: 'customer_address' })
  customer_address: string;

  @Column({ name: 'customer_zip' })
  customer_zip: string;

  @Column({ name: 'customer_email' })
  customer_email: string;

  @Column({ name: 'customer_reference', unique: true })
  customer_reference: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;

  @OneToOne(() => IndividualCustomer, (individual) => individual.customer)
  individual: IndividualCustomer;

  @OneToOne(() => CorporateCustomer, (corporate) => corporate.customer)
  corporate: CorporateCustomer;
}
