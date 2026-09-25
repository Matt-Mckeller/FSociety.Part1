import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session, SessionParticipant, Transcript, TranscriptSegment } from './entities';
import { SessionsService } from './sessions.service';
import { SessionsResolver } from './sessions.resolver';
import { TranscriptService } from './transcript.service';
import { TranscriptResolver } from './transcript.resolver';
import { AuthModule } from '../auth/auth.module';
import { RoomsModule } from '../rooms/rooms.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Session, SessionParticipant, Transcript, TranscriptSegment]),
    AuthModule,
    RoomsModule,
  ],
  providers: [SessionsService, SessionsResolver, TranscriptService, TranscriptResolver],
  exports: [SessionsService, TranscriptService],
})
export class SessionsModule {}
