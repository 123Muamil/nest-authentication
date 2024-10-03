import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { UserService } from './user.service';
@Controller('admin')
export class AdminController {
  constructor(private readonly userService: UserService) {}
  @Get('dashboard')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard) 
  async getAdminDashboard(@Request() req) {
    const userId = req.user.userId; 
    const adminData = await this.userService.getAdminData(userId);
    return {
      message: 'This is the admin dashboard',
      status:"201",
      user: adminData, 
    };
  }
}

@Controller('seller')
export class SellerController {
  constructor(private readonly userService: UserService) {}
  @Get('dashboard')
  @Roles(Role.Seller)
  @UseGuards(JwtAuthGuard, RolesGuard)  
  async getSellerDashboard(@Request() req) {
    const userId = req.user.userId; 
    const sellerData = await this.userService.getAdminData(userId);
    return {
      message: 'This is the seller dashboard',
      user: sellerData,
    };
  }
}

@Controller('buyer')
export class BuyerController {
  constructor(private readonly userService: UserService) {}
  @Get('dashboard')
  @Roles(Role.Buyer)
  @UseGuards(JwtAuthGuard, RolesGuard) 
  async getBuyerDashboard(@Request() req) {
    const userId = req.user.userId; 
    const buyerData = await this.userService.getAdminData(userId);
    return {
      message: 'This is the buyer dashboard',
      user: buyerData,
    };
  }
}
