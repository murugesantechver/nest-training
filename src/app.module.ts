import { Module } from '@nestjs/common';
import { UsersModule } from './features/users/users.module';
import { ProductsModule } from './features/products/products.module';
import { ConfigModule, /*ConfigService*/ } from '@nestjs/config';
// import { SequelizeModule } from '@nestjs/sequelize';
import { TestModModule } from './features/test-mod/test-mod.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { RedisModule } from './infrastructure/redis/redis.module';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    //Configuration Modules
     ConfigModule.forRoot({
      isGlobal: true,
    }),
    // SequelizeModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => ({
    //     dialect: 'postgres',
    //     host: config.get<string>('DB_HOST'),
    //     port: config.get<number>('DB_PORT'),
    //     username: config.get<string>('DB_USER'),
    //     password: config.get<string>('DB_PASSWORD'),
    //     database: config.get<string>('DB_NAME'),
    //     autoLoadModels: true,
    //     synchronize: false,
    //   }),
    // }),

    //Auth and security Modules
    AuthModule,

    //Infrastructure Modules
    DatabaseModule,
    RedisModule,
    LoggerModule,

    //Feature Modules
    UsersModule, 
    ProductsModule, 
    TestModModule,
  ],
})
export class AppModule {}
