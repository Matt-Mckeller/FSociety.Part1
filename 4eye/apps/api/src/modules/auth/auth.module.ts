import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const secret = config.get<string>('JWT_SECRET');
        const nodeEnv = config.get<string>('NODE_ENV');
        
        // CRITICAL: Fail in production if no JWT_SECRET is set
        if (!secret && nodeEnv === 'production') {
          throw new Error('JWT_SECRET must be set in production environment');
        }
        
        return {
          secret: secret || 'dev-jwt-secret-DO-NOT-USE-IN-PRODUCTION',
          signOptions: {
            expiresIn: config.get<string>('JWT_EXPIRATION') || '1h', // Shorter default
            issuer: '4eye.ai',
            audience: '4eye-app',
          },
        };
      },
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy, GqlAuthGuard, RolesGuard],
  exports: [AuthService, GqlAuthGuard, RolesGuard],
})
export class AuthModule {}
