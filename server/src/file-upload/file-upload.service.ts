import { Injectable } from '@nestjs/common';

@Injectable()
export class FileUploadService {
  create(createFile: File) {
    return 'This action adds a new fileUpload';
  }

  findAll() {
    return `This action returns all fileUpload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fileUpload`;
  }

  update(id: number, updateFile: File) {
    return `This action updates a #${id} fileUpload`;
  }

  remove(id: number) {
    return `This action removes a #${id} fileUpload`;
  }
}
