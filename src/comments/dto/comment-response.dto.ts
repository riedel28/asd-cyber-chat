import { Expose, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CommentResponseDto {
  @ApiProperty({ description: 'Comment id.', example: 12 })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'Comment body.',
    example:
      'Rotate keys quarterly and immediately after any suspected exposure.',
  })
  @Expose()
  body: string;

  @ApiProperty({
    description: 'Username of the comment author.',
    example: 'ada',
  })
  @Expose()
  author: string;

  @ApiPropertyOptional({
    description: 'Optional image URL attached to the comment.',
    example: 'https://example.com/evidence.png',
    nullable: true,
  })
  @Expose()
  imageUrl: string;

  @ApiProperty({
    description: 'Comment creation timestamp.',
    format: 'date-time',
    example: '2026-06-03T10:20:30.000Z',
  })
  @Expose()
  @Type(() => Date)
  createdAt: Date;
}
