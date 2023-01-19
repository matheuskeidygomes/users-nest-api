import { Module } from '@nestjs/common';
import { UsersProviders } from '../database/providers/users.provider';
import { DatabaseModule } from '../database/modules/database.module';
import { UsersService } from '../services/users.service';
import { UsersController } from '../controllers/users.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, ...UsersProviders],
  exports: [UsersService],
})

export class UsersModule {}
