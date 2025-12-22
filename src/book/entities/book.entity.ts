import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,ManyToMany,JoinTable } from 'typeorm';
import { BookCategory } from '../../book-category/entities/book-category.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  author: string;

  @Column({ default: 0 })
  price: number;

  @Column({ default: 0 })
  likeCount: number;

  // Relationship: Many Books belong to One Category
  @ManyToOne(() => BookCategory, (category) => category.id)
  category: BookCategory;

  @Column({ nullable: true })
  categoryId: string; // ใช้สำหรับบันทึกด้วย ID โดยตรง
 
  @ManyToMany(() => User, (user) => user.likedBooks)
    likedBy: User[];
}

