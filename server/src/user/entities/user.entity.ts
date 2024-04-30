import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  Or,
  JoinColumn,
} from 'typeorm';

import { USER_ROLE } from './enum/ROLE';
import { ApiProperty } from '@nestjs/swagger';
import { Organization } from 'src/organization/entities/organization.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ unique: true })
  username: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty()
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty()
  @Column({ type: 'enum', enum: USER_ROLE, default: USER_ROLE.MODERATOR })
  role: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;

  @ApiProperty({ type: Organization })
  @OneToOne(() => Organization, (organization) => organization.user)
  organization: Organization;
}
