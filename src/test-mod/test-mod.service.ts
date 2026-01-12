import { Injectable } from '@nestjs/common';

@Injectable()
export class TestModService {
    getHello(): string {
        return 'Hello from TestModService!';
    }
}
