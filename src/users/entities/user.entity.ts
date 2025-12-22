import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,ManyToMany,JoinTable } from 'typeorm';
import { Book } from '../../book/entities/book.entity';
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false }) 
  password: string; // เราจะเก็บแบบ Hashed

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  
  @ManyToMany(() => Book, (book) => book.likedBy)
  @JoinTable() // ต้องมี JoinTable อย่างน้อย 1 ฝั่งเพื่อให้ TypeORM สร้างตารางกลางให้
  likedBooks: Book[];
}

