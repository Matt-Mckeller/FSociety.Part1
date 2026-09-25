import { Module } from '@nestjs/common';
import { ValidateService } from './validate.service.js';
import { LibraryModule } from '../library/library.module.js';

@Module({
  imports: [LibraryModule],
  providers: [ValidateService],
  exports: [ValidateService],
})
export class ValidateModule {}
