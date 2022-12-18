import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  readonly nombre: string;

  @IsEmail()
  @IsNotEmpty()
  readonly correo: string;

  @MaxLength(10)
  @MinLength(10)
  @IsNotEmpty()
  readonly celular: string;

  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  readonly indicativo: string;

  @IsNotEmpty()
  readonly autoriza: boolean;
}
