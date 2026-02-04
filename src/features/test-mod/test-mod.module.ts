import { Module } from '@nestjs/common';
import { TestModController } from './test-mod.controller';
import { TestModService } from './test-mod.service';

@Module({
  controllers: [TestModController],
  providers: [TestModService]
})
export class TestModModule {}
