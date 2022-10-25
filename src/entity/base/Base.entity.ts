import { BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class Base extends BaseEntity {
  
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
