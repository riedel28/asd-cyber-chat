import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { QuotesService } from '../quotes.service';
import { QuoteResponseDto } from './dto/quote-response.dto';

@ApiTags('quotes')
@ApiBearerAuth()
@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get()
  @ApiOperation({ summary: 'List quotes, optionally filtered by author' })
  @ApiQuery({
    name: 'author',
    required: false,
    description: 'Filter quotes by exact author name, case-insensitively.',
    example: 'Steve Jobs',
  })
  @ApiOkResponse({
    description: 'Quotes matching the optional author filter.',
    type: [QuoteResponseDto],
  })
  @ApiUnauthorizedResponse({ description: 'A valid bearer token is required.' })
  getQuotes(@Query('author') author: string) {
    return this.quotesService.getQuotes(author);
  }

  @Get('random')
  @ApiOperation({ summary: 'Get a random quote' })
  @ApiOkResponse({
    description: 'A random quote.',
    type: QuoteResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'A valid bearer token is required.' })
  getRandomQuote() {
    return this.quotesService.getRandomQuote();
  }
}
