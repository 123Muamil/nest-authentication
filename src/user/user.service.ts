import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.model'; 
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async getAdminData(userId: string) {
    return this.userModel.findById(userId); 
  }
  // Find user by email
  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email });
  }

  // Create new user
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, confirmPassword } = createUserDto;

    // Validate if email already exists
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    // Validate if passwords match
    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const createdUser = new this.userModel({
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
      phoneNumber: createUserDto.phoneNumber,
      address: createUserDto.address || null,
      role: createUserDto.role,
      refreshToken: createUserDto.refreshToken || null, 
    });

    return createdUser.save();
  }
}
