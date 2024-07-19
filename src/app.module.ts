import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UploadImageModule } from './api/upload-image/upload-image.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
    UploadImageModule,
  ],
})
export class AppModule {}
