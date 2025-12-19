import { Injectable, OnModuleInit, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // 1. ส่วนของ Seeding: จะทำงานทันทีที่รันแอปครั้งแรก
  async onModuleInit() {
    const adminEmail = 'admin@bookstore.com';
    const adminExists = await this.findOneByEmail(adminEmail);

    if (!adminExists) {
      console.log('🚀 Seeding Admin User...');
      // สร้าง Admin เริ่มต้น
      await this.create({
        email: adminEmail,
        password: 'adminpassword',
        role: UserRole.ADMIN,
      } as CreateUserDto);
      console.log('✅ Admin User created successfully');
    }
  }

  // 2. ส่วนของ Create: มีการ Hash Password ก่อนบันทึก
  async create(createUserDto: CreateUserDto) {
    // เช็คว่า email ซ้ำไหม
    const existingUser = await this.findOneByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('Email already exists!');
    }

    // เข้ารหัสรหัสผ่าน (Hashing)
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    // บันทึกลง Database
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    
    return await this.userRepository.save(user);
  }

  // 3. ส่วนของการค้นหาข้อมูล
  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) { // เปลี่ยนจาก number เป็น string ตาม UUID ของ Entity
    return await this.userRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  // 4. ส่วนของการแก้ไขและลบ
  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.userRepository.delete(id);
    return { deleted: true };
  }
}

