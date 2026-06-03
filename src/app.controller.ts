import { Controller, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('app')
@ApiBearerAuth()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Return a simple API greeting' })
  @ApiOkResponse({
    description: 'A plain-text API greeting.',
    schema: { type: 'string', example: 'Hello NestJS!!!' },
  })
  @ApiUnauthorizedResponse({ description: 'A valid bearer token is required.' })
  getHello(): string {
    return 'Hello NestJS!!!';
  }
}
