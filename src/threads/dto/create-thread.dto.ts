import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateThreadDto {
  @ApiProperty({
    description: 'Thread title.',
    minLength: 3,
    maxLength: 120,
    example: 'How should we rotate API keys?',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(120)
  title: string;

  @ApiProperty({
    description: 'Thread body.',
    minLength: 1,
    maxLength: 5000,
    example:
      'We need a practical rotation plan for shared service credentials.',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(5000)
  body: string;
}
