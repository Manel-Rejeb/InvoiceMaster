import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Customer } from 'src/customers/entities/customer.entity';
import { BUSINESS_TYPE } from 'src/customers/entities/enum/BUSINESS_TYPE';

@Entity()
export class Corporate {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ name: 'corporate_TIN', unique: true })
  corporate_TIN: string;

  @ApiProperty()
  @Column({ name: 'corporate_industry' })
  corporate_industry: string;

  @ApiProperty()
  @Column({ name: 'corporate_website', unique: true })
  corporate_website: string;

  @ApiProperty()
  @Column({ name: 'corporate_logo' })
  corporate_logo: string;

  @ApiProperty()
  @Column({
    name: 'corporate_type',
    type: 'enum',
    enum: BUSINESS_TYPE,
    default: BUSINESS_TYPE.OTHERS,
  })
  corporate_type: string;

  @ApiProperty({ type: () => Customer })
  @OneToOne(() => Customer, (customer) => customer.corporate, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  customer: Customer;
}
