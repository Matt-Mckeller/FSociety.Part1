import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LootBox {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
