import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Customer } from './customer.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CorporateCustomer {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ name: 'corporation_name' })
  corporation_name: string;

  @ApiProperty()
  @Column({ name: 'tax_number' })
  tax_number: string;

  @ApiProperty()
  @Column({ name: 'industry' })
  industry: string;

  @ApiProperty()
  @Column({ name: 'headquarter_address' })
  headquarter_address: string;

  @ApiProperty()
  @Column({ name: 'contact_person_first_name' })
  contact_person_first_name: string;

  @ApiProperty()
  @Column({ name: 'contact_person_last_name' })
  contact_person_last_name: string;

  @ApiProperty()
  @Column({ name: 'contact_person_email' })
  contact_person_email: string;

  @ApiProperty()
  @Column({ name: 'contact_person_job_title' })
  contact_person_job_title: string;

  @ApiProperty()
  @Column({ name: 'contact_person_phone_number' })
  contact_person_phone_number: string;

  @OneToOne(() => Customer, (customer) => customer.corporate)
  @JoinColumn()
  customer: Customer;
}
