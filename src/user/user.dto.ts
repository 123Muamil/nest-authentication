import { IsNotEmpty, IsString, IsEmail, IsOptional, IsPhoneNumber, Matches } from 'class-validator';
import { Role } from '../auth/roles.enum';
export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    password: string;
  
    @IsNotEmpty()
    @IsString()
    confirmPassword: string;
  
    @IsNotEmpty()
    @IsPhoneNumber(null)  
    phoneNumber: string;
  
    @IsOptional()
    @IsString()
    address?: string;
  
    @IsNotEmpty()
    @IsString()
    role: string;
  
    @IsOptional()
    @IsString()
    refreshToken?: string;
  }
  
export class LoginDto{
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UserDto {
  @IsNotEmpty() 
  @IsString()
  _id: string; 

  @IsNotEmpty()
  @IsString()
  name: string; 

  @IsNotEmpty()
  @IsEmail()
  email: string; 

  @IsNotEmpty()
  @IsString()
  password: string; 

  @IsNotEmpty()
  @IsPhoneNumber(null) 
  phoneNumber: string; 

  @IsOptional()
  @IsString()
  address?: string;

  @IsNotEmpty()
  @IsString()
  role: string; 

  @IsOptional()
  @IsString()
  refreshToken?: string;
}