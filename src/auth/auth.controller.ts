import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BasicTokenGuard } from './guard/basic-token.guard';
import { RefreshTokenGuard } from './guard/bearer-token.guard';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('token/access')
    @UseGuards(RefreshTokenGuard)
    postTokenAccess(@Headers('authorization') rawToken: string) {
        const token = this.authService.extractTokenFromHeader(rawToken, true);

        const newToken = this.authService.rotateToken(token, false);
        /**
         * {accessToekn: {token}}
         */
        return {
            accessToken: newToken,
        };
    }

    @Post('token/refresh')
    @UseGuards(RefreshTokenGuard)
    postTokenRefresh(@Headers('authorization') rawToken: string) {
        const token = this.authService.extractTokenFromHeader(rawToken, true);

        const newToken = this.authService.rotateToken(token, true);
        /**
         * {refreshToekn: {token}}
         */
        return {
            refreshToken: newToken,
        };
    }

    @Post('login/email')
    @UseGuards(BasicTokenGuard)
    postLoginEmail(@Headers('authorization') rawToken: string) {
        // email:password -> base64
        // sdajhaksd:asdkhask
        const token = this.authService.extractTokenFromHeader(rawToken, false);

        const credentials = this.authService.decodeBasicToken(token);

        return this.authService.loginWithEmail(credentials);
    }

    @Post('register/email')
    postRegisterEmail(@Body() body: RegisterUserDto) {
        return this.authService.registerWithEmail({
            ...body,
        });
    }
}
