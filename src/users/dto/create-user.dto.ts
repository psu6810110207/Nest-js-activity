export class CreateUserDto {
  email: string;

  password: string;

  // หากในอนาคตต้องการให้ระบุ Role ตอนสร้างด้วย
  role?: any; 
}