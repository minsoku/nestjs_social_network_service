import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    /**
     * serialization -> 직렬화 -> 현재 시스템(nestjs)
     *  데이터의 구조를 다룬 시스템에서도 쉽게 사용할 수 있는 포맷으로 변환
     *  -> class의 objectdptj JSON 포맷으로 변환
     * deserialization -> 역직렬화
     */
    getUsers() {
        return this.usersService.getAllUser();
    }
}
