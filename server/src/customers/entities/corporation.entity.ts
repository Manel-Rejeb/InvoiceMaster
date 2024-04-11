import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Customer } from './customer.entity';

@Entity()
export class CorporateCustomer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'corporation_name' })
  corporation_name: string;

  @Column({ name: 'tax_number' })
  tax_number: string;

  @Column({ name: 'industry' })
  industry: string;

  @Column({ name: 'headquarter_address' })
  headquarter_address: string;

  @Column({ name: 'contact_person_first_name' })
  contact_person_first_name: string;

  @Column({ name: 'contact_person_last_name' })
  contact_person_last_name: string;

  @Column({ name: 'contact_person_email' })
  contact_person_email: string;

  @Column({ name: 'contact_person_job_title' })
  contact_person_job_title: string;

  @Column({ name: 'contact_person_phone_number' })
  contact_person_phone_number: string;

  @OneToOne(() => Customer, (customer) => customer.corporate)
  @JoinColumn()
  customer: Customer;
}
