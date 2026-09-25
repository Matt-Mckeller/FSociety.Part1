import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, IsNull } from 'typeorm';
import { User } from './entities/user.entity';
import { ConsentLog } from './entities/consent-log.entity';
import { PasswordResetToken } from './entities/password-reset-token.entity';
import { CreateUserInput, UpdateUserInput } from './dto/user.input';
import { ConsentType } from '../../common/enums';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(ConsentLog)
    private readonly consentLogRepository: Repository<ConsentLog>,
    @InjectRepository(PasswordResetToken)
    private readonly passwordResetRepository: Repository<PasswordResetToken>,
  ) {}

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } as FindOptionsWhere<User> });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email: email.toLowerCase() } });
  }

  async findByOAuthProvider(provider: string, providerId: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { oauthProvider: provider, oauthProviderId: providerId } as FindOptionsWhere<User>,
    });
  }

  async create(input: CreateUserInput): Promise<User> {
    const existingUser = await this.findByEmail(input.email);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const user = this.userRepository.create({
      ...input,
      email: input.email.toLowerCase(),
      passwordHash: input.password ? await bcrypt.hash(input.password, 12) : undefined,
    });

    return this.userRepository.save(user);
  }

  async update(id: string, input: UpdateUserInput): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, input);
    return this.userRepository.save(user);
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    if (!user.passwordHash) return false;
    return bcrypt.compare(password, user.passwordHash);
  }

  async updatePassword(userId: string, newPassword: string): Promise<void> {
    const passwordHash = await bcrypt.hash(newPassword, 12);
    await this.userRepository.update(userId, { passwordHash });
  }

  async markEmailVerified(userId: string): Promise<void> {
    await this.userRepository.update(userId, { emailVerifiedAt: new Date() });
  }

  // Consent management
  async logConsent(
    userId: string,
    type: ConsentType,
    version: string,
    ipAddress: string,
    userAgent: string,
    locale?: string,
  ): Promise<ConsentLog> {
    const consent = this.consentLogRepository.create({
      userId,
      type,
      version,
      acceptedAt: new Date(),
      ipAddress,
      userAgent,
      locale,
    });
    return this.consentLogRepository.save(consent);
  }

  async getLatestConsent(userId: string, type: ConsentType): Promise<ConsentLog | null> {
    return this.consentLogRepository.findOne({
      where: { userId, type },
      order: { acceptedAt: 'DESC' },
    });
  }

  // Password reset
  async createPasswordResetToken(user: User): Promise<string> {
    // Invalidate existing tokens
    await this.passwordResetRepository.update(
      { userId: user.id, usedAt: IsNull() } as FindOptionsWhere<PasswordResetToken>,
      { usedAt: new Date() },
    );

    const token = randomBytes(32).toString('hex');
    const resetToken = this.passwordResetRepository.create({
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
    });

    await this.passwordResetRepository.save(resetToken);
    return token;
  }

  async validatePasswordResetToken(token: string): Promise<PasswordResetToken | null> {
    const resetToken = await this.passwordResetRepository.findOne({
      where: { token },
      relations: ['user'],
    });

    if (!resetToken) return null;
    if (resetToken.usedAt) return null;
    if (resetToken.expiresAt < new Date()) return null;

    return resetToken;
  }

  async usePasswordResetToken(token: string): Promise<void> {
    await this.passwordResetRepository.update({ token }, { usedAt: new Date() });
  }

  async softDelete(id: string): Promise<void> {
    await this.userRepository.softDelete(id);
  }
}
