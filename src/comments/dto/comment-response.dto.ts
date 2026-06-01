import { Expose, Type } from 'class-transformer';

export class CommentResponseDto {
  @Expose()
  id: number;

  @Expose()
  body: string;

  @Expose()
  author: string;

  @Expose()
  imageUrl: string;

  @Expose()
  @Type(() => Date)
  createdAt: Date;
}
