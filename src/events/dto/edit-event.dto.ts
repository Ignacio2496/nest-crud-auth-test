import { IsOptional, IsString } from 'class-validator';

export class EditEventDto {
  @IsString()
  @IsOptional()
  name?: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsString()
  @IsOptional()
  publisher?: string;
}
