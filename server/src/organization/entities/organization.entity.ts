import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ name: 'organization_name' })
  organization_name: string;

  @ApiProperty()
  @Column({ name: 'organization_address' })
  organization_address: string;

  @ApiProperty()
  @Column({ name: 'organization_industry' })
  organization_post: string;

  @ApiProperty()
  @Column({ name: 'organization_tax_number' })
  organization_tax_number: string;

  @ApiProperty()
  @Column({ name: 'organization_logo' })
  organization_logo: string;

  @ApiProperty()
  @Column({ name: 'organization_email' })
  organization_email: string;

  @ApiProperty()
  @Column({ name: 'organization_phone' })
  organization_phone: number;

  @ApiProperty()
  @Column({ name: 'organization_country' })
  organization_country: string;

  @ApiProperty()
  @Column({ name: 'organization_state' })
  organization_state: string;

  @ApiProperty()
  @Column({ name: 'organization_zip' })
  organization_zip: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;

  @OneToOne(() => User, (user) => user.organization, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}
