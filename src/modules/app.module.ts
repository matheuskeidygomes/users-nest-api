import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/modules/database.module';
import { UsersModule } from './users.module';
import { AuthModule } from 'src/auth/modules/auth.module';

@Module({
  imports: [UsersModule, AuthModule, DatabaseModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})

export class AppModule { }
