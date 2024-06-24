import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  Res,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { Public } from 'src/shared/decorators/public.decorator';
import path from 'path';
import * as fs from 'fs';

@Public()
@Controller('file')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.fileUploadService.uploadFile(file);
  }

  // @Get(':filename')
  // async getFile(@Param('filename') filename: string, @Res() res: Response) {
  //   const filePath = `./uploads/${filename}`;
  //   res.sendFile(filePath, { root: '.' });
  // }
}
