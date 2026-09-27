import { Test, TestingModule } from '@nestjs/testing';
import { ExpanseEduBackendController } from './expanse-edu-backend.controller';
import { ExpanseEduBackendService } from './expanse-edu-backend.service';

describe('ExpanseEduBackendController', () => {
  let expanseEduBackendController: ExpanseEduBackendController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ExpanseEduBackendController],
      providers: [ExpanseEduBackendService],
    }).compile();

    expanseEduBackendController = app.get<ExpanseEduBackendController>(ExpanseEduBackendController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(expanseEduBackendController.getHello()).toBe('Hello World!');
    });
  });
});
