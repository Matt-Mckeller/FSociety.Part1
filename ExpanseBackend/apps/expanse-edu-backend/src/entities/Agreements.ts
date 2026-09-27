import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Agreements {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column()
  // termsOfServiceAgreementTimestamp: Date;
  // @Column()
  // privacyPolicyAgreementTimestamp: Date;
}
