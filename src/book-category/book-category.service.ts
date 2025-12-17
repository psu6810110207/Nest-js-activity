import { Injectable, OnModuleInit } from '@nestjs/common'; // เพิ่ม OnModuleInit
import { CreateBookCategoryDto } from './dto/create-book-category.dto';
import { UpdateBookCategoryDto } from './dto/update-book-category.dto';
import { InjectRepository } from '@nestjs/typeorm'; // เพิ่ม
import { BookCategory } from './entities/book-category.entity'; // เพิ่ม
import { Repository } from 'typeorm'; // เพิ่ม

@Injectable()
export class BookCategoryService implements OnModuleInit { // เพิ่ม implements OnModuleInit
  
  // 1. ส่วนนี้คือการ Inject Repository เพื่อให้เราใช้คำสั่ง Database ได้ (this.repo)
  constructor(
    @InjectRepository(BookCategory)
    private repo: Repository<BookCategory>,
  ) {}

  // 2. ฟังก์ชันนี้จะทำงานอัตโนมัติ 1 ครั้ง ตอนเริ่มโปรแกรม
  async onModuleInit() {
    const count = await this.repo.count(); // นับว่ามีข้อมูลหรือยัง
    if (count === 0) {
      console.log('Seeding Book Categories...'); // โชว์ข้อความใน Terminal
      await this.repo.save([ // บันทึกข้อมูลตัวอย่าง 3 อัน
        { name: 'Fiction', description: 'Stories and novels' },
        { name: 'Technology', description: 'Computers and engineering' },
        { name: 'History', description: 'Past events' }
      ]);
    }
  }

  create(createBookCategoryDto: CreateBookCategoryDto) {
    return 'This action adds a new bookCategory';
  }

  // แก้ไข findAll ให้ดึงข้อมูลจริงจาก DB
  findAll() {
    return this.repo.find(); 
  }

  findOne(id: number) {
    return `This action returns a #${id} bookCategory`;
  }

  update(id: number, updateBookCategoryDto: UpdateBookCategoryDto) {
    return `This action updates a #${id} bookCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookCategory`;
  }
}