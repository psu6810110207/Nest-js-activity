import { Injectable, OnModuleInit, NotFoundException } from '@nestjs/common';
import { CreateBookCategoryDto } from './dto/create-book-category.dto';
import { UpdateBookCategoryDto } from './dto/update-book-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookCategory } from './entities/book-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookCategoryService implements OnModuleInit {
  
  constructor(
    @InjectRepository(BookCategory)
    private repo: Repository<BookCategory>,
  ) {}

  async onModuleInit() {
    const count = await this.repo.count();
    if (count === 0) {
      console.log('Seeding Book Categories...');
      await this.repo.save([
        { name: 'Fiction', description: 'Stories and novels' },
        { name: 'Technology', description: 'Computers and engineering' },
        { name: 'History', description: 'Past events' }
      ]);
    }
  }

  // ข้อ 2: POST ข้อมูลที่ถูกต้อง
  async create(createBookCategoryDto: CreateBookCategoryDto) {
    const newCategory = this.repo.create(createBookCategoryDto);
    return await this.repo.save(newCategory);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const category = await this.repo.findOneBy({ id: id as any });
    if (!category) throw new NotFoundException(`Category with ID ${id} not found`);
    return category;
  }

  // ข้อ 3: PATCH แก้ไขชื่อหมวดหมู่
  async update(id: string, updateBookCategoryDto: UpdateBookCategoryDto) {
    await this.repo.update(id, updateBookCategoryDto);
    return this.findOne(id);
  }

  // ข้อ 4: DELETE ลบหมวดหมู่
  async remove(id: string) {
    const category = await this.findOne(id);
    await this.repo.delete(id);
    return { message: 'Delete success', deletedData: category };
  }
}