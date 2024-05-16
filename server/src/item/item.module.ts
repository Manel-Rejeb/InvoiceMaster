import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Estimate } from 'src/estimate/entities/estimate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Estimate])],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [TypeOrmModule, ItemService],
})
export class ItemModule {}
