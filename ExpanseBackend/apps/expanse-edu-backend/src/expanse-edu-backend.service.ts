import { Injectable } from '@nestjs/common';

@Injectable()
export class ExpanseEduBackendService {
  getHello(): string {
    return 'Hello World!';
  }
}
