/**
 * Organization Entity
 * 
 * Organizations are groups that can own rooms and manage members.
 * Organizations have their own subscription/billing.
 */

/** Organization subscription tier */
export type OrganizationTier = 
  | 'STARTER'
  | 'GROWTH' 
  | 'SCALE' 
  | 'ENTERPRISE' 
  | 'CUSTOM';

/**
 * Organization entity.
 */
export interface Organization {
  /** Unique identifier */
  id: string;
  /** Organization name */
  name: string;
  /** Optional description */
  description?: string;
  /** Subscription tier */
  tier: OrganizationTier;
  /** Maximum monthly STT hours */
  maxHoursPerMonth: number;
  /** Maximum allowed rooms */
  maxRooms: number;
  /** Whether org is active */
  isActive: boolean;
  /** Creation timestamp */
  createdAt: string;
  /** Last update timestamp */
  updatedAt: string;
}

/** User role within an organization */
export type OrganizationMemberRole = 'MEMBER' | 'HOST' | 'ADMIN' | 'OWNER';

/**
 * Membership linking a user to an organization.
 */
export interface OrganizationMember {
  /** Unique identifier */
  id: string;
  /** Organization ID */
  organizationId: string;
  /** User ID */
  userId: string;
  /** Role within organization */
  role: OrganizationMemberRole;
  /** When member joined */
  joinedAt: string;
}
