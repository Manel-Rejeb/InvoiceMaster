import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Setting } from './entities/setting.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting)
    private readonly settingRepository: Repository<Setting>,
  ) {}

  async create(createSetting: Setting): Promise<Setting> {
    const newSetting = await this.settingRepository.create(createSetting);
    return this.settingRepository.save(newSetting);
  }

  findAll() {
    return `This action returns all settings`;
  }

  async findOne(): Promise<Setting> {
    const latestSetting = await this.settingRepository.findOne({
      where: {},
      order: { createdAt: 'DESC' },
    });

    if (!latestSetting) {
      throw new NotFoundException('No settings found');
    }

    return latestSetting;
  }

  async update(id: number, updateSetting: Setting): Promise<Setting> {
    const SettingData = await this.settingRepository.findOneBy({ id });
    if (!SettingData) {
      throw new NotFoundException('data not found');
    }
    await this.settingRepository.update(id, updateSetting);
    return await this.settingRepository.findOneBy({ id });
  }

  remove(id: number) {
    return `This action removes a #${id} setting`;
  }
}
