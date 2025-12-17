import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm'; // เพิ่ม
import { Repository } from 'typeorm'; // เพิ่ม
import { Book } from './entities/book.entity'; // เพิ่ม

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) // เพิ่ม constructor เพื่อใช้ repo
    private bookRepository: Repository<Book>,
  ) {}

  // แก้ไข: เพื่อให้ POST ข้อมูลแล้วบันทึกลง DB จริง
  async create(createBookDto: CreateBookDto) {
    const newBook = this.bookRepository.create(createBookDto);
    return await this.bookRepository.save(newBook);
  }

  findAll() {
    return this.bookRepository.find({ relations: ['category'] }); // ดึงข้อมูลพร้อมหมวดหมู่
  }

  async findOne(id: string) {
    const book = await this.bookRepository.findOne({ 
      where: { id: id as any },
      relations: ['category'] 
    });
    if (!book) throw new NotFoundException(`ไม่พบหนังสือไอดี: ${id}`);
    return book;
  }
  async update(id: string, updateBookDto: UpdateBookDto) {
    // 1. ค้นหาและอัปเดตข้อมูล (ใช้ await เพื่อรอให้ DB ทำงานเสร็จ)
    await this.bookRepository.update(id, updateBookDto);

    // 2. ดึงข้อมูลที่อัปเดตแล้วกลับมาส่งให้ User ดู (เรียกใช้ findOne ที่เราเขียนไว้)
    const updatedBook = await this.findOne(id);
    
    // 3. ส่งข้อมูลกลับไปที่ Controller
    return updatedBook;
  }
  // ฟังก์ชัน Like ที่คุณต้องการ
  async incrementLikes(id: string) {
    const book = await this.findOne(id); // เรียกใช้ findOne ที่เราแก้ข้างบน
    book.likeCount += 1;
    return await this.bookRepository.save(book); // บันทึกจำนวนไลก์ที่เพิ่มขึ้น
  }

  async remove(id: string) {
    const book = await this.findOne(id);
    return await this.bookRepository.remove(book);
  }
}

