import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book } from './entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book])], // ตรวจสอบว่ามีบรรทัดนี้หรือไม่
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}