import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Invoice } from './entities/invoice.entity';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
  ) {}

  async create(createInvoice: Invoice): Promise<Invoice> {
    const newInvoice = await this.invoiceRepository.create(createInvoice);
    return this.invoiceRepository.save(newInvoice);
  }

  async findAll(): Promise<Invoice[]> {
    return this.invoiceRepository.find();
  }

  async findOne(id: number): Promise<Invoice> {
    const invoiceData = await this.invoiceRepository.findOneBy({ id });
    if (!invoiceData) {
      throw new NotFoundException('Invoice Not Found');
    }
    return invoiceData;
  }

  async update(id: number, updateInvoice: Invoice): Promise<Invoice> {
    const invoiceData = await this.invoiceRepository.findOneBy({ id });
    if (!invoiceData) {
      throw new NotFoundException('Invoice Not Found');
    }
    const updatedInvoice = this.invoiceRepository.merge(
      invoiceData,
      updateInvoice,
    );
    return await this.invoiceRepository.save(updatedInvoice);
  }

  async remove(id: number) {
    const invoice = await this.invoiceRepository.findOneBy({ id });
    if (!invoice) {
      throw new NotFoundException('Invoice Not Found');
    }
    return await this.invoiceRepository.remove(invoice);
  }

  async findOneByReferenceCode(
    reference_code: string,
  ): Promise<Invoice | null> {
    return await this.invoiceRepository.findOne({
      where: { invoice_reference: reference_code },
    });
  }
}
