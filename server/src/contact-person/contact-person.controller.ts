import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ContactPersonService } from './contact-person.service';
import { ContactPerson } from './entities/contact-person.entity';
import { Public } from 'src/shared/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@Public()
@ApiTags('contact-person')
@Controller('api/contact-person')
export class ContactPersonController {
  constructor(private readonly contactPersonService: ContactPersonService) {}

  @Post()
  create(@Body() createContactPerson: ContactPerson) {
    return this.contactPersonService.create(createContactPerson);
  }

  @Get()
  findAll() {
    return this.contactPersonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactPersonService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateContactPersonDto: ContactPerson,
  ) {
    return this.contactPersonService.update(+id, updateContactPersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactPersonService.remove(+id);
  }
}
