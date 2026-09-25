import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, ConsentLog, PasswordResetToken } from './entities';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, ConsentLog, PasswordResetToken]),
    forwardRef(() => AuthModule),
  ],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
