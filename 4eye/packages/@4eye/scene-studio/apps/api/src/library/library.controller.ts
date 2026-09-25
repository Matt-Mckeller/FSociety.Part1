import { Controller, Get, Param } from '@nestjs/common';
import { LibraryService } from './library.service.js';

@Controller()
export class LibraryController {
  constructor(private readonly library: LibraryService) {}

  @Get('library')
  getLibrary() {
    return this.library.getLibrary();
  }

  @Get('assets/:id')
  getAsset(@Param('id') id: string) {
    return this.library.getAsset(id);
  }
}
