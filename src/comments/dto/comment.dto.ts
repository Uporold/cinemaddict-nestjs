import { IsIn, MaxLength, MinLength } from 'class-validator';

export class CommentDto {
  @MinLength(10)
  @MaxLength(140)
  message: string;
  @IsIn([`smile`, `sleeping`, `puke`, `angry`])
  emotion: string;
}
