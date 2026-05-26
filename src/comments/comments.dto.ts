export class CreateCommentDto {
  body: string;

  author: string;
}

export class UpdateCommentDto {
  body?: string;

  author?: string;

  threadId: string;
}
