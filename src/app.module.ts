import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookCategoryModule } from './book-category/book-category.module';
import { BookModule } from './book/book.module';

@Module({
  imports: [
    // เรียกใช้ Module สำหรับเชื่อมต่อ Database
    TypeOrmModule.forRoot({
      type: 'postgres',        // บอกว่าเป็น Database แบบ PostgreSQL
      host: 'localhost',       // ฐานข้อมูลอยู่ที่เครื่องเรา (เพราะเรา Forward Port จาก Docker มาแล้ว)
      port: 5432,              // พอร์ตมาตรฐาน (ต้องตรงกับ docker-compose)
      username: 'admin',       // ต้องตรงกับ POSTGRES_USER ใน docker-compose
      password: 'password123', // ต้องตรงกับ POSTGRES_PASSWORD ใน docker-compose
      database: 'bookstore_dev', // ต้องตรงกับ POSTGRES_DB ใน docker-compose
      entities: [],            // รายชื่อตาราง (ตอนนี้ยังว่างอยู่ เดี๋ยวเรามาเติม)
      synchronize: true,      
       autoLoadEntities: true, // สำคัญ! โหมดนี้จะแก้โครงสร้าง Database ตามโค้ดเราอัตโนมัติ (ใช้เฉพาะตอน Dev)
    }),
    BookCategoryModule,
    BookModule,
  ],
})
export class AppModule {}