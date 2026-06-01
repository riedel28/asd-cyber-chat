import { Type } from 'class-transformer';
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
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @Min(1)
  page = 1;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @Min(1)
  @Max(100)
  limit = 10;

  @IsOptional()
  @IsIn(['-createdAt', 'createdAt'])
  sort = '-createdAt';

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  author?: string;
}
