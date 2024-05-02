import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
  @Column({ name: 'project_status' })
  project_status: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;
}
