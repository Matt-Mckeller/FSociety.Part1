import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Integration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  edLinkIntegrationAccessToken: string;
}
