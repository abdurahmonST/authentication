import { Injectable } from "@nestjs/common";
import { Role, User } from "@prisma/client";
import { registerDto } from "./dtos/register-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon2 from 'argon2'
import { LoginDto } from "./dtos/login-user.dto";

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {}

    async register(dto: registerDto): Promise<User> {
        const passwordHash = await argon2.hash(dto.password);
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                name: dto.name,
                passwordHash: passwordHash,
                role: dto.role as Role,
            },
        });

        return user;
    };

    async login(dto: LoginDto): Promise<User> {
        
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if(!user) {
            throw new Error('User not found');
        }

        const passwordVaild = await argon2.verify(user.passwordHash, dto.password);
        if(!passwordVaild) {
            throw new Error('Invalid password');
        }

        return user;
    }
};