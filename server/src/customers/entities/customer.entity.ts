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
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ name: 'customer_type', type: 'boolean', default: true })
  type_customer: boolean;

  @ApiProperty()
  @Column({ name: 'customer_number' })
  customer_number: string;

  @ApiProperty()
  @Column({ name: 'customer_country' })
  customer_country: string;

  @ApiProperty()
  @Column({ name: 'customer_city' })
  customer_city: 'string';

  @ApiProperty()
  @Column({ name: 'customer_address' })
  customer_address: string;

  @ApiProperty()
  @Column({ name: 'customer_zip' })
  customer_zip: string;

  @ApiProperty()
  @Column({ name: 'customer_email' })
  customer_email: string;

  @ApiProperty()
  @Column({ name: 'customer_reference', unique: true })
  customer_reference: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;

  @ApiProperty({ type: IndividualCustomer })
  @OneToOne(() => IndividualCustomer, (individual) => individual.customer)
  individual: IndividualCustomer;

  @ApiProperty({ type: CorporateCustomer })
  @OneToOne(() => CorporateCustomer, (corporate) => corporate.customer)
  corporate: CorporateCustomer;
}
