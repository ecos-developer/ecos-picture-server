import { Injectable, NotFoundException } from '@nestjs/common';
import { existsSync, readdirSync, statSync, unlinkSync } from 'fs';
import { join } from 'path';
import { DeleteFileDto } from './dto/delete-file.dto';

@Injectable()
export class UploadImageService {
  private readonly publicDir = join(__dirname, '..', '..', '..', 'public');

  getFilesAndDirectories(): any {
    return this.readDirectory(this.publicDir);
  }

  deleteFiles(deleteFileDto: DeleteFileDto) {
    const filePath = join(
      this.publicDir,
      `${deleteFileDto.directory}/${deleteFileDto.filename}`,
    );
    if (!existsSync(filePath)) {
      throw new NotFoundException(
        `File ${deleteFileDto.directory}/${deleteFileDto.filename} not found`,
      );
    }
    unlinkSync(filePath);
    return true;
  }

  private readDirectory(path: string): any {
    const items = readdirSync(path);
    const result = items.map((item) => {
      const fullPath = join(path, item);
      const isDirectory = statSync(fullPath).isDirectory();
      return {
        name: item,
        type: isDirectory ? 'directory' : 'file',
        path: fullPath,
        ...(isDirectory && { children: this.readDirectory(fullPath) }),
      };
    });
    return result;
  }
}
