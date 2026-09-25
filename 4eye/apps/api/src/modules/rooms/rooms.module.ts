import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities';
import { RoomsService } from './rooms.service';
import { RoomsResolver } from './rooms.resolver';
import { AuthModule } from '../auth/auth.module';
import { OrganizationsModule } from '../organizations/organizations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room]),
    AuthModule,
    OrganizationsModule,
  ],
  providers: [RoomsService, RoomsResolver],
  exports: [RoomsService],
})
export class RoomsModule {}
