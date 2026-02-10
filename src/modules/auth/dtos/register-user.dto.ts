import { IsEmail, IsString, MaxLength, MinLength } from "class-validator"

export class registerDto {
    @IsString()
    id: string
    
    @IsEmail()
    email: string
    
    @IsString()
    @MaxLength(16)
    @MinLength(8)
    password: string

    @IsString()
    name: string

    @IsString()
    role: string

}