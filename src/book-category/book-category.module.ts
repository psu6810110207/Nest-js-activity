import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 1. เพิ่ม import นี้
import { BookCategoryService } from './book-category.service';
import { BookCategoryController } from './book-category.controller';
import { BookCategory } from './entities/book-category.entity'; // 2. เพิ่ม import นี้

@Module({
  imports: [
    TypeOrmModule.forFeature([BookCategory]), // 3. เพิ่มบรรทัดนี้ลงไปใน imports array
  ],
  controllers: [BookCategoryController],
  providers: [BookCategoryService],
})
export class BookCategoryModule {}