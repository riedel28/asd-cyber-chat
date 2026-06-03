import { ApiProperty } from '@nestjs/swagger';
import { ThreadResponseDto } from './thread-response.dto';

class PaginationMetaDto {
  @ApiProperty({ description: 'Current page number.', example: 1 })
  page: number;

  @ApiProperty({
    description: 'Maximum number of items per page.',
    example: 10,
  })
  limit: number;

  @ApiProperty({ description: 'Total matching threads.', example: 42 })
  total: number;

  @ApiProperty({ description: 'Total available pages.', example: 5 })
  totalPages: number;
}

export class PaginatedThreadsResponseDto {
  @ApiProperty({ type: () => [ThreadResponseDto] })
  data: ThreadResponseDto[];

  @ApiProperty({ type: () => PaginationMetaDto })
  meta: PaginationMetaDto;
}
