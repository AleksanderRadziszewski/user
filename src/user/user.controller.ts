import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiQuery,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiOkResponse({ type: User, isArray: true, description: 'users found' })
  @ApiNotFoundResponse()
  @ApiQuery({ name: 'name', required: false })
  @ApiBadRequestResponse()
  @Get()
  getUsers(@Query('name') name: string): User[] {
    return this.userService.findAll(name);
  }
  @ApiOkResponse({ type: User, description: 'user found ' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): User {
    const user = this.userService.findById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
  @ApiCreatedResponse({ type: User, description: 'user created' })
  @ApiBadRequestResponse()
  @Post()
  createUser(@Body() body: CreateUserDto): User {
    return this.userService.createUser(body);
  }
}
