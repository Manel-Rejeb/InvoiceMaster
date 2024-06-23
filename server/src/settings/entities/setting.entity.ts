import { ApiProperty } from '@nestjs/swagger';
import { BUSINESS_TYPE } from 'src/customers/entities/enum/BUSINESS_TYPE';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Setting {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ name: 'organization_email' })
  organization_email: string;

  @ApiProperty()
  @Column({ name: 'organization_name' })
  organization_name: string;

  @ApiProperty()
  @Column({ name: 'organization_phone' })
  organization_phone: string;

  @ApiProperty()
  @Column({ name: 'organization_country' })
  organization_country: string;

  @ApiProperty()
  @Column({ name: 'organization_city' })
  organization_city: 'string';

  @ApiProperty()
  @Column({ name: 'organization_address' })
  organization_address: string;

  @ApiProperty()
  @Column({ name: 'organization_zip' })
  organization_zip: string;
  @ApiProperty()
  @Column({ name: 'organization_TIN' })
  organization_TIN: string;

  @ApiProperty()
  @Column({ name: 'organization_industry' })
  organization_industry: string;

  @ApiProperty()
  @Column({ name: 'organization_website' })
  organization_website: string;

  @ApiProperty()
  @Column({ name: 'organization_logo' })
  organization_logo: string;

  @ApiProperty()
  @Column({
    name: 'organization_type',
    type: 'enum',
    enum: BUSINESS_TYPE,
    default: BUSINESS_TYPE.OTHERS,
  })
  organization_type: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;
}
