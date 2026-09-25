// Shared enums across modules
// Each module can have its own specific enums, but these are truly cross-cutting

import { registerEnumType } from '@nestjs/graphql';

// System-wide user roles
export enum UserRole {
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN',
}

// Organization-level roles
export enum OrgRole {
  MEMBER = 'MEMBER',
  HOST = 'HOST',
  ADMIN = 'ADMIN',
}

// Vertical types for organizations
export enum VerticalType {
  LEARNING = 'LEARNING',
  EDUCATION = 'EDUCATION',
  RELIGION = 'RELIGION',
  PROFESSIONAL = 'PROFESSIONAL',
}

// Reading level preferences
export enum ReadingLevel {
  CHILD = 'CHILD',
  STANDARD = 'STANDARD',
  ACADEMIC = 'ACADEMIC',
}

// Session status
export enum SessionStatus {
  SCHEDULED = 'SCHEDULED',
  LIVE = 'LIVE',
  ENDED = 'ENDED',
  CANCELLED = 'CANCELLED',
}

// Session participant roles
export enum ParticipantRole {
  HOST = 'HOST',
  PARTICIPANT = 'PARTICIPANT',
  GUEST = 'GUEST',
}

// Consent types for legal compliance
export enum ConsentType {
  TOS = 'TOS',
  PRIVACY_POLICY = 'PRIVACY_POLICY',
  RECORDING_CONSENT = 'RECORDING_CONSENT',
}

// OAuth providers
export enum OAuthProvider {
  GOOGLE = 'GOOGLE',
  APPLE = 'APPLE',
}

// Transcript processing status
export enum TranscriptStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

// Register enums for GraphQL
registerEnumType(UserRole, { name: 'UserRole', description: 'System-wide user roles' });
registerEnumType(OrgRole, { name: 'OrgRole', description: 'Organization-level roles' });
registerEnumType(VerticalType, { name: 'VerticalType', description: 'Organization vertical types' });
registerEnumType(ReadingLevel, { name: 'ReadingLevel', description: 'Content reading level' });
registerEnumType(SessionStatus, { name: 'SessionStatus', description: 'Live session status' });
registerEnumType(ParticipantRole, { name: 'ParticipantRole', description: 'Session participant roles' });
registerEnumType(ConsentType, { name: 'ConsentType', description: 'Legal consent types' });
registerEnumType(OAuthProvider, { name: 'OAuthProvider', description: 'OAuth providers' });
registerEnumType(TranscriptStatus, { name: 'TranscriptStatus', description: 'Transcript processing status' });
