import { Expose, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CommentResponseDto } from '../../comments/dto/comment-response.dto';

export class ThreadResponseDto {
  @ApiProperty({
    description: 'Thread id.',
    format: 'uuid',
    example: '2f28da1d-b4df-4579-b178-6abdddfc9e1f',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Thread title.',
    example: 'How should we rotate API keys?',
  })
  @Expose()
  title: string;

  @ApiProperty({
    description: 'Thread body.',
    example:
      'We need a practical rotation plan for shared service credentials.',
  })
  @Expose()
  body: string;

  @ApiProperty({
    description: 'Username of the thread author.',
    example: 'ada',
  })
  @Expose()
  author: string;

  @ApiProperty({
    description: 'Thread creation timestamp.',
    format: 'date-time',
    example: '2026-06-03T10:15:30.000Z',
  })
  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @ApiPropertyOptional({
    description:
      'Comments on the thread when loaded by an endpoint that includes relations.',
    type: () => [CommentResponseDto],
  })
  @Expose()
  @Type(() => CommentResponseDto)
  comments: CommentResponseDto[];
}
