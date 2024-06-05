import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post()
  create(@Body() createFile: File) {
    return this.fileUploadService.create(createFile);
  }

  @Get()
  findAll() {
    return this.fileUploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileUploadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFile: File) {
    return this.fileUploadService.update(+id, updateFile);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileUploadService.remove(+id);
  }
}
