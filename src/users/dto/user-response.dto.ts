import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    description: 'User id.',
    format: 'uuid',
    example: '7b7d4828-9f0e-41d0-a78e-616b2dc9db3a',
  })
  @Expose()
  id: string;

  @ApiProperty({ description: 'Unique username.', example: 'ada' })
  @Expose()
  username: string;
}
