import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Public } from '../common/decorators/public.decorator';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import type { AuthenticatedUser } from './types/authenticated-user';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register a new user account' })
  @ApiCreatedResponse({
    description: 'The user account was created.',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'The registration payload is invalid.',
  })
  @ApiConflictResponse({ description: 'The username is already taken.' })
  register(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign in and receive a JWT access token' })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({
    description: 'The credentials are valid and a JWT was issued.',
    type: LoginResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'The username or password is invalid.',
  })
  login(@Request() req: { user: AuthenticatedUser }) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Return the authenticated user profile' })
  @ApiOkResponse({
    description: 'The authenticated user profile.',
    type: UserResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'A valid bearer token is required.' })
  me(@Request() req: { user: AuthenticatedUser }) {
    return req.user;
  }
}
