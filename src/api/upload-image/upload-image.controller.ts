import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Delete,
  Body,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserDetailUpload } from './upload/user_detail.upload';
import { UserDetailDto } from './dto/user-detail.dto';
import { DriverDetailUpload } from './upload/driver_detail.upload';
import { DriverDetailDto } from './dto/driver-detail.dto';
import { PaymentHeaderDto } from './dto/payment-header.dto';
import { PaymentHeaderUpload } from './upload/payment_header.upload';
import { UploadImageService } from './upload-image.service';
import { DeleteFileDto } from './dto/delete-file.dto';

@ApiTags('Upload Image Endpoint')
@Controller('upload-image')
export class UploadImageController {
  constructor(private readonly uploadImageService: UploadImageService) {}

  @Post('user-detail')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'upload UserDetail profile_image' })
  @UseInterceptors(
    FileInterceptor('profile_image_file', {
      storage: UserDetailUpload.storageOptions,
    }),
  )
  @ApiBody({
    description: 'endpoint for upload user profile',
    type: UserDetailDto,
  })
  userDetail(@UploadedFile() profile_image_file: Express.Multer.File) {
    return profile_image_file.filename;
  }

  @Post('driver-detail')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'upload DriverDetail vehicle_image' })
  @UseInterceptors(
    FileInterceptor('vehicle_image_file', {
      storage: DriverDetailUpload.storageOptions,
    }),
  )
  @ApiBody({
    description: 'endpoint for upload driver vehicle',
    type: DriverDetailDto,
  })
  driverDetail(@UploadedFile() vehicle_image_file: Express.Multer.File) {
    return vehicle_image_file.filename;
  }

  @Post('payment-header')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'upload PaymentHeader payment_proof_image' })
  @UseInterceptors(
    FileInterceptor('payment_proof_image', {
      storage: PaymentHeaderUpload.storageOptions,
    }),
  )
  @ApiBody({
    description: 'endpoint for upload driver vehicle',
    type: PaymentHeaderDto,
  })
  paymentHeaderUpload(@UploadedFile() vehicle_image_file: Express.Multer.File) {
    return vehicle_image_file.filename;
  }

  @Get('public')
  @ApiOperation({
    summary: 'get all folders and files inside public directory',
  })
  getAllFiles() {
    return this.uploadImageService.getFilesAndDirectories();
  }

  @Delete('delete-file')
  @ApiOperation({ summary: 'delete file by directory and name' })
  @ApiBody({
    description: 'endpoint for delete file',
    type: DeleteFileDto,
  })
  deleteFile(@Body() deleteFileDto: DeleteFileDto) {
    return this.uploadImageService.deleteFiles(deleteFileDto);
  }
}
