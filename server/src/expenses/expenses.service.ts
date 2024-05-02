import { Injectable, NotFoundException } from '@nestjs/common';
import { Expense } from './entities/expense.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
  ) {}

  async create(createExpense: Expense): Promise<Expense> {
    const newExpense = await this.expenseRepository.create(createExpense);
    return this.expenseRepository.save(newExpense);
  }

  async findAll(): Promise<Expense[]> {
    return this.expenseRepository.find();
  }

  findOne(id: number): Promise<Expense> {
    const expenseData = this.expenseRepository.findOneBy({ id });
    if (!expenseData) {
      throw new NotFoundException('Expense Not Found');
    }
    return expenseData;
  }

  async update(id: number, updateExpense: Expense): Promise<Expense> {
    const expenseData = this.expenseRepository.findOneBy({ id });
    if (!expenseData) {
      throw new NotFoundException('Expense Not Found');
    }
    await this.expenseRepository.update(id, updateExpense);
    return this.expenseRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<Expense> {
    const expenseData = await this.expenseRepository.findOneBy({ id });
    if (!expenseData) {
      throw new NotFoundException('Expense not found');
    }
    return await this.expenseRepository.remove(expenseData);
  }
}
