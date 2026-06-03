import { ApiProperty } from '@nestjs/swagger';

export class QuoteResponseDto {
  @ApiProperty({ description: 'Quote identifier.', example: 1 })
  id: number;

  @ApiProperty({
    description: 'Quote text.',
    example: 'The best way to predict the future is to create it.',
  })
  quote: string;

  @ApiProperty({ description: 'Quote author.', example: 'Peter Drucker' })
  author: string;
}
