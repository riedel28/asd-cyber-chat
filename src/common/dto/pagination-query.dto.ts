import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsIn,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Page number to fetch.',
    type: Number,
    minimum: 1,
    default: 1,
    example: 1,
  })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @Min(1)
  page = 1;

  @ApiPropertyOptional({
    description: 'Maximum number of threads per page.',
    type: Number,
    minimum: 1,
    maximum: 100,
    default: 10,
    example: 10,
  })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @Min(1)
  @Max(100)
  limit = 10;

  @ApiPropertyOptional({
    description: 'Sort order for thread creation time.',
    enum: ['-createdAt', 'createdAt'],
    default: '-createdAt',
    example: '-createdAt',
  })
  @IsOptional()
  @IsIn(['-createdAt', 'createdAt'])
  sort = '-createdAt';

  @ApiPropertyOptional({
    description: 'Filter threads by author username.',
    minLength: 1,
    maxLength: 50,
    example: 'ada',
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  author?: string;
}
