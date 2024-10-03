import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import Redis from 'ioredis'; 
import { CreateUserDto, UserDto } from '../user/user.dto';

@Injectable()
export class AuthService {
  private redisClient: Redis; 

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {
    this.redisClient = new Redis({
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: Number(process.env.REDIS_PORT) || 6379,
    });
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: UserDto) {
    const payload = {
      sub: user._id,           
      name: user.name,         
      email: user.email,      
      phoneNumber: user.phoneNumber, 
      role: user.role,        
      address: user.address, 
    };
    const accessToken = this.jwtService.sign(payload);
    return {
      access_token: accessToken,
      role:user.role,
    };
  }

  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }
    const user = await this.userService.createUser(createUserDto);
    // Optionally login user after registration
    // return this.login(user);
    return user;
  }

  async logout(token: string): Promise<void> {
    const decodedToken = this.jwtService.decode(token) as any;
    if (decodedToken && decodedToken.exp) {
      const expiryTime = decodedToken.exp - Math.floor(Date.now() / 1000);
      // Blacklist token in Redis with the token's remaining expiry time
      await this.redisClient.set(token, 'blacklisted', 'EX', expiryTime);
    }
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const result = await this.redisClient.get(token);
    return result === 'blacklisted';
  }
}
