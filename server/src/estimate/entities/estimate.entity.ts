import { ApiProperty } from '@nestjs/swagger';
import { Customer } from 'src/customers/entities/customer.entity';
import { Item } from 'src/item/entities/item.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Tax } from 'src/taxes/entities/tax.entity';
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

@Entity()
export class Estimate {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ name: 'estimate_reference' })
  estimate_reference: string;

  // TODO: use the createdAt annotation
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
  @Column({ name: 'estimate_image' })
  estimate_image: string;

  @ApiProperty()
  @Column({ name: 'estimate_total' })
  estimate_total: number;

  @ApiProperty()
  @Column({ name: 'estimate_subtotal' }) // price before tax and discount
  estimate_subtotal: number;

  @ApiProperty()
  @Column({ name: 'estimate_discount' })
  estimate_discount: number;

  @ApiProperty()
  @Column({ name: 'estimate_description' })
  estimate_description: string;

  @ApiProperty()
  @Column({ name: 'estimate_status' })
  estimate_status: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;

  // Establishing one-to-many relationship items
  @ApiProperty({ type: () => Item })
  @OneToMany(() => Item, (item) => item.estimate)
  @JoinColumn()
  items: Item[];

  // Establishing many-to-one relationship with Project
  @ApiProperty({ type: () => Project })
  @ManyToOne(() => Project, (project) => project.estimates, {
    cascade: true,
  })
  @JoinTable()
  project: Project;

  // Establishing many-to-one relationship with Customer
  @ApiProperty({ type: () => Customer })
  @ManyToOne(() => Customer, (customer) => customer.estimates, {
    cascade: true,
  })
  @JoinTable()
  customer: Customer;

  @ApiProperty({ type: () => Tax })
  @ManyToOne(() => Tax, (tax) => tax.estimates, {
    cascade: true,
  })
  @JoinTable()
  tax: Tax;
}
