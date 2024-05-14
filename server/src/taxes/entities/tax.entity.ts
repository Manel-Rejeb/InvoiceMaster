import { ApiProperty } from '@nestjs/swagger';
import { Organization } from 'src/organization/entities/organization.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Tax {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ name: 'tax_name', nullable: false })
  tax_name: string;

  @ApiProperty()
  @Column({ name: 'tax_percentage', nullable: false })
  tax_percentage: number;

  @ApiProperty()
  @Column({ name: 'tax_description', nullable: false })
  tax_description: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;

  @Column({
    name: 'isSoftDelete',
    default: false,
  })
  isSoftDelete?: boolean;
}
