import { IsString } from "class-validator";

export class CreateUsersDto {
    @IsString()
    readonly email: string;

    @IsString()               
    readonly password: string;

}