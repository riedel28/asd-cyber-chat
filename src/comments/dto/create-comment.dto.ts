import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment body.',
    minLength: 1,
    maxLength: 1000,
    example:
      'Rotate keys quarterly and immediately after any suspected exposure.',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(1000)
  body: string;
}
