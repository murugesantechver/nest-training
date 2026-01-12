import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { CreationAttributes } from 'sequelize';
import { RedisService } from 'src/infrastructure/redis/redis.service';
import { LoggerService } from 'src/infrastructure/logger/logger.service';
import { successResponse } from 'src/common/utils/response.util';

@Injectable()
export class UsersService {
  private readonly USERS_CACHE_KEY = 'users:all';
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private readonly redisService: RedisService,
    private readonly logger: LoggerService,
  ) {}

  // async findAll() {
  //   return this.userModel.findAll({
  //     attributes: { exclude: ['password'] },
  //   });
  // }

  async findAll() {
    // 1️⃣ Try cache
    const cachedUsers = await this.redisService.get<User[]>(
      this.USERS_CACHE_KEY,
    );

    this.logger.log('cachedUsers', cachedUsers);

    if (cachedUsers) {
      return successResponse(cachedUsers, 'Users fetched successfully');
    }

    // 2️⃣ Fetch from DB
    const users = await this.userModel.findAll({
      attributes: { exclude: ['password'] },
    });

    // 3️⃣ Save to cache (TTL: 60 seconds)
    await this.redisService.set(this.USERS_CACHE_KEY, users, 60);

    return successResponse(users, 'Users fetched successfully');
  }

  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException('Invalid user id..................');
    }

    return this.userModel.findOne({
      where: { id },
    });
  }

  async create(dto: CreateUserDto) {
    const user = await this.userModel.create(dto as CreationAttributes<User>);

    // 🔥 Cache invalidation (VERY IMPORTANT)
    await this.redisService.del(this.USERS_CACHE_KEY);

    return user;
  }
}
