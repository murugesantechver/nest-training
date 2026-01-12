import { Controller , Get, Version } from '@nestjs/common';
import { TestModService } from './test-mod.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('testing module for v2')
@Controller('users')
export class TestModController {
    constructor(private readonly testModService: TestModService) {
    }

    @Get()
    @Version('2')
    @ApiTags('Users')
    @ApiOperation({ summary: 'Get all users (v2)' })
    getHello() {
        return this.testModService.getHello();
    }
}
