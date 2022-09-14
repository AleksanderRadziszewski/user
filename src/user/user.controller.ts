import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiOkResponse({ type: User, isArray: true, description: 'users found' })
  @ApiQuery({ name: 'name', required: false })
  @Get()
  getUsers(@Query('name') name: string): User[] {
    return this.userService.findAll(name);
  }
  @ApiOkResponse({ type: User, description: 'user found ' })
  @Get(':id')
  getUserById(@Param('id') id: string): User {
    return this.userService.findById(Number(id));
  }
  @ApiCreatedResponse({ type: User, description: 'user created' })
  @Post()
  createUser(@Body() body: CreateUserDto): User {
    return this.userService.createUser(body);
  }
}
