import { Controller, Get, Query } from '@nestjs/common';
import { QuotesService } from 'src/quotes.service';

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get()
  getQuotes(@Query('author') author: string) {
    return this.quotesService.getQuotes(author);
  }

  @Get('random')
  getRandomQuote() {
    return this.quotesService.getRandomQuote();
  }
}
