import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
// import { Session } from './session.entity';
// import { Agreement } from './agreement.entity';

// @Entity({ name: 'User', database: 'main' })
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column({ default: true })
  active: boolean;

  //   @OneToMany(() => Session, (session) => session.user)
  //   sessions: Session[];

  //   @OneToMany(() => Agreement, (agreement) => agreement.user)
  //   agreements: Agreement[];

  //   @Column()
  //   role: string;

  //   @Column()
  //   email: string;

  //   @Column()
  //   phone: string;

  //   @Column()
  //   password: string;

  //   @Column()
  //   salt: string;

  //   @Column({ nullable: true })
  //   resetPasswordPasscode: string;

  //   @Column({ nullable: true })
  //   resetPasswordPasscodeExpiration: Date;

  //   @Column({ nullable: true })
  //   lastLogIn: Date;

  ////   @Column()
  //   createdAt: Date;

  //   @Column()
  //   updatedAt: Date;

  //   @Column({ nullable: true })
  //   lockoutExpiry: Date;

  //   @Column({ default: 0 })
  //   loginAttempts: number;

  //   @Column({ default: false })
  //   isLockedOut: boolean;
}
