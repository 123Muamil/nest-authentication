import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AdminController, BuyerController, SellerController } from './user/user.controller';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://123muzamiliqbal:5S5J1vNmmyc2NHJS@ezzisell.bjbbz.mongodb.net/?retryWrites=true&w=majority&appName=ezzisell'),
    AuthModule, 
    UserModule,
  ],
  controllers: [AuthController,AdminController,BuyerController,SellerController],

})
export class AppModule {}
