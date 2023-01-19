import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from 'src/database/modules/database.module';
import { UsersProviders } from 'src/database/providers/users.provider';
import { UsersService } from '../../services/users.service';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { JwtStrategy } from '../strategies/jwt.strategy';

@Module({
  imports: [DatabaseModule,PassportModule,JwtModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtStrategy, ...UsersProviders],
  exports: [AuthService],
})
export class AuthModule {}