import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ContactPerson {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ name: 'contact_first_name' })
  contact_first_name: string;

  @ApiProperty()
  @Column({ name: 'contact_last_name' })
  contact_last_name: string;

  @ApiProperty()
  @Column({ name: 'contact_email' })
  contact_email: string;

  @ApiProperty()
  @Column({ name: 'contact_job_title' })
  contact_job_title: string;

  @ApiProperty()
  @Column({ name: 'contact_phone' })
  contact_phone: string;
}
