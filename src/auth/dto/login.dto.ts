import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Username registered with the API.',
    example: 'ada',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Password for the username.',
    example: 'correct-horse-battery-staple',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
