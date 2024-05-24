import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { Corporate } from 'src/customers/entities/corporation.entity';
import { Estimate } from 'src/estimate/entities/estimate.entity';
import { Project } from 'src/projects/entities/project.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ name: 'customer_email', unique: true })
  customer_email: string;

  @ApiProperty()
  @Column({ name: 'customer_contact_name', nullable: false })
  customer_contact_name: string;

  @ApiProperty()
  @Column({ name: 'customer_contact_last_name' })
  customer_contact_last_name: string;

  @ApiProperty()
  @Column({ name: 'customer_reference', unique: true })
  customer_reference: string;

  @ApiProperty()
  @Column({ name: 'customer_type', type: 'boolean', default: true })
  customer_type: boolean;

  @ApiProperty()
  @Column({ name: 'customer_phone' })
  customer_phone: string;

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

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;

  /* relations */

  // Establishing one-to-one relationship with Corporate
  @ApiProperty({ type: Corporate })
  @OneToOne(() => Corporate, (corporate) => corporate.customer, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  corporate: Corporate;

  // Establishing one-to-many relationship with Project
  @ApiProperty({ type: () => Project })
  @OneToMany(() => Project, (project) => project.customer)
  @JoinTable()
  projects: Project[];

  // Establishing one-to-many relationship with Estimate
  @ApiProperty({ type: () => Estimate })
  @OneToMany(() => Estimate, (estimate) => estimate.customer)
  @JoinColumn()
  estimates: Estimate[];
}
