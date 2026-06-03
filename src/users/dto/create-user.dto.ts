import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Unique username used to sign in and own threads/comments.',
    minLength: 3,
    maxLength: 80,
    example: 'ada',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  username: string;

  @ApiProperty({
    description: 'Plain-text password. It is hashed before storage.',
    minLength: 8,
    maxLength: 128,
    example: 'correct-horse-battery-staple',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(128)
  password: string;
}
