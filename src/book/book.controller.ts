import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { CurrentUser } from '../auth/current-user.decorator'
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  // Public
  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  // Admin Only: CREATE
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  // ✅ Admin Only: DELETE (จุดที่ขาดไป)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/like')
  async toggleLike(@Param('id') id: string, @CurrentUser() user: any) {
    return this.bookService.toggleLike(id, user.userId); 
  }
}


