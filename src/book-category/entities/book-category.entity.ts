import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity() // 1. บอกว่า Class นี้คือตารางใน Database
export class BookCategory {
  
  @PrimaryGeneratedColumn('uuid') // 2. สร้าง ID แบบสุ่มตัวเลขยาวๆ (UUID) ให้เองอัตโนมัติ
  id: string;

  @Column() // 3. สร้างคอลัมน์ธรรมดา (จำเป็นต้องใส่ข้อมูล)
  name: string;

  @Column({ nullable: true }) // 4. สร้างคอลัมน์ที่ "ปล่อยว่างได้" (ไม่ต้องใส่ก็ได้)
  description: string;

  @CreateDateColumn() // 5. บันทึกเวลาสร้างให้อัตโนมัติ
  createdAt: Date;

  @UpdateDateColumn() // 6. บันทึกเวลาแก้ไขล่าสุดให้อัตโนมัติ
  updatedAt: Date;
}