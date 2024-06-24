import { BadRequestException, Injectable } from '@nestjs/common';
import { extname } from 'path';

@Injectable()
export class FileUploadService {
  async uploadFile(File: Express.Multer.File) {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedMimeTypes.includes(File.mimetype)) {
      throw new BadRequestException('Invalid file type');
    }
    if (File.size > maxSize) {
      throw new BadRequestException('File size exceeds limit');
    }

    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    const newFilename = `${randomName}${extname(File.originalname)}`;

    return newFilename;
  }
}
