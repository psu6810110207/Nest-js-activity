import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'; // 1. Import เพิ่ม
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookCategoryModule } from './book-category/book-category.module';
import { BookModule } from './book/book.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // 2. ตั้งค่า ConfigModule เพื่ออ่านไฟล์ .env
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // 3. เปลี่ยนจาก forRoot เป็น forRootAsync
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        // ดึงค่าจาก .env ผ่าน ConfigService
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true, // ใช้เฉพาะตอน Development เท่านั้น
      }),
    }),

    BookCategoryModule,
    BookModule,
    UsersModule,
  ],
})
export class AppModule {}