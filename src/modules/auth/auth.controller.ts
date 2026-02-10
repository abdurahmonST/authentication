import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { registerDto } from "./dtos/register-user.dto";
import { LoginDto } from "./dtos/login-user.dto";

@Controller('users')
export class AuthController {
    constructor(private readonly service: AuthService) {}
    @Post('register')
    async register(@Body() dto: registerDto) {
        const user = await this.service.register(dto)
        return user
    }

    @Post('login')
    async login(@Body() dto: LoginDto) {
        const user = await this.service.login(dto)
        return user
    }
}