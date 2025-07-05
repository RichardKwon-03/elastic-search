import { IsString, Length } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @Length(2, 255)
  readonly title: string;

  @IsString()
  readonly content: string;

  @IsString()
  @Length(2, 100)
  readonly author: string;
}
