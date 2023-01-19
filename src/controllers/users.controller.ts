import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUsersDto } from './dto/create-users-dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<any[]> {
    let res = await this.usersService.getAll();
    return res;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param() params: object, @Request() req): Promise<any> {
    console.log(req.user);
    let res = await this.usersService.getOne(params['id']);
    return res;
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  async update(@Param() params: object, @Body() body: object): Promise<any> {
    let res = await this.usersService.update(params['id'], body);
    return res;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param() params: object): Promise<any> {
    let res = await this.usersService.delete(params['id']);
    return res;
  }

}
