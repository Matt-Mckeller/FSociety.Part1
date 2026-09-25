import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization, OrganizationUser } from './entities';
import { OrganizationsService } from './organizations.service';
import { OrganizationsResolver } from './organizations.resolver';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Organization, OrganizationUser]),
    AuthModule,
  ],
  providers: [OrganizationsService, OrganizationsResolver],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}
