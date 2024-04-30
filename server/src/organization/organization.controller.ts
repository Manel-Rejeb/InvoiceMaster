import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { Public } from 'src/shared/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { Organization } from './entities/organization.entity';

@Public() // just for testing purposes
@ApiTags('organization')
@Controller('api/organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  create(@Body() createOrganization: Organization) {
    return this.organizationService.create(createOrganization);
  }

  @Get()
  findAll() {
    return this.organizationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganization: Organization) {
    return this.organizationService.update(+id, updateOrganization);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationService.remove(+id);
  }
}
