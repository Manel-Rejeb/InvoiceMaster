import { ApiProperty } from '@nestjs/swagger';
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
import { PROJECT_STATUS } from './enum/PROJECT_STATUS';
import { Customer } from 'src/customers/entities/customer.entity';
import { Estimate } from 'src/estimate/entities/estimate.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ name: 'project_name', nullable: false })
  project_name: string;

  @ApiProperty()
  @Column({ name: 'project_description' })
  project_description: string;

  @ApiProperty()
  @Column({ name: 'project_start_date' })
  project_start_date: Date;

  @ApiProperty()
  @Column({ name: 'project_end_date' })
  project_end_date: Date;

  @ApiProperty()
  @Column({
    name: 'project_status',
    type: 'enum',
    enum: PROJECT_STATUS,
    default: PROJECT_STATUS.ONGOING,
  })
  project_status: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;

  // Establishing one-to-many relationship with Customer
  @ApiProperty({ type: () => Customer })
  @ManyToOne(() => Customer, (customer) => customer.projects)
  @JoinTable()
  customer: Customer;

  // Establishing one-to-many relationship with estimate
  @ApiProperty({ type: () => Estimate })
  @OneToMany(() => Estimate, (estimate) => estimate.project)
  @JoinColumn()
  estimates: Estimate[];
}
