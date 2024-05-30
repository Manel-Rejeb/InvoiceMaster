import { ApiProperty } from '@nestjs/swagger';

import { Item } from 'src/item/entities/item.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Project } from 'src/projects/entities/project.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ESTIMATE_STATUS } from './enum/ESTIMATE_STATUS';

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
  @Column({ name: 'estimate_discount', type: 'float' })
  estimate_discount: number;

  @ApiProperty()
  @Column({ name: 'estimate_discount_type', type: 'bool' })
  estimate_discount_type: boolean;

  @ApiProperty()
  @Column({ name: 'estimate_notes', type: 'text' })
  estimate_notes: string;

  @ApiProperty()
  @Column({
    name: 'estimate_status',
    type: 'enum',
    enum: ESTIMATE_STATUS,
    default: ESTIMATE_STATUS.DRAFT,
  })
  estimate_status: string;

  @ApiProperty()
  @Column({ name: 'estimate_total' })
  estimate_total: number;

  // Establishing one-to-many relationship items
  @ApiProperty({ type: () => Item })
  @OneToMany(() => Item, (item) => item.estimate)
  items: Item[];

  // Establishing many-to-one relationship with Project
  @ApiProperty({ type: () => Project })
  @ManyToOne(() => Project, (project) => project.estimates, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn()
  project: Project;

  // Establishing many-to-one relationship with Customer
  @ApiProperty({ type: () => Customer })
  @ManyToOne(() => Customer, (customer) => customer.estimates, {
    cascade: true,
  })
  @JoinColumn()
  customer: Customer;

  @Column({
    name: 'estimate_tax_per_item_enabled',
    type: 'bool',
    default: false,
  })
  estimate_tax_per_item_enabled: boolean;

  @Column({ name: 'estimate_tax', type: 'float', default: 0 })
  estimate_tax: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;
}
