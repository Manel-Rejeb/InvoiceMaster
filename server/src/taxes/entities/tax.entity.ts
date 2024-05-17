import { ApiProperty } from '@nestjs/swagger';
import { Estimate } from 'src/estimate/entities/estimate.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
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

  @ApiProperty({ type: () => Estimate })
  @ManyToMany(() => Estimate, (estimate) => estimate.tax)
  @JoinTable()
  estimates: Estimate;
}
