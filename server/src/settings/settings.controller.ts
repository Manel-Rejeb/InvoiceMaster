import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { Public } from 'src/shared/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { Setting } from './entities/setting.entity';

@Public()
@ApiTags('setting')
@Controller('api/setting')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post()
  create(@Body() createSetting: Setting) {
    return this.settingsService.create(createSetting);
  }

  @Get()
  findOne() {
    return this.settingsService.findOne();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSetting: Setting) {
    return this.settingsService.update(+id, updateSetting);
  }
}
