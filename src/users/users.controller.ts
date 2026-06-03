import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user account' })
  @ApiCreatedResponse({
    description: 'The user account was created.',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({ description: 'The user payload is invalid.' })
  @ApiUnauthorizedResponse({ description: 'A valid bearer token is required.' })
  @ApiConflictResponse({ description: 'The username is already taken.' })
  createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }
}
