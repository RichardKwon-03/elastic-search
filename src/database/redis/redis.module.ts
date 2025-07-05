import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { BullModule } from '@nestjs/bull';
import { getRedisConfig, getBullRedisConfig } from './redis.config';
import { RedisUtil, ENUM } from '../../utils';

@Module({
  imports: [
    ConfigModule,
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: getBullRedisConfig(configService),
      }),
    }),
    BullModule.registerQueue({
      name: 'BULL_QUEUE',
    }),
  ],
  providers: [
    {
      provide: ENUM.REDIS_DEFAULT_TOKEN,
      useFactory: (configService: ConfigService) => {
        const redisOptions = getRedisConfig(configService);
        return new Redis(redisOptions);
      },
      inject: [ConfigService],
    },
    RedisUtil,
  ],
  exports: [RedisUtil, BullModule],
})
export class RedisModule {}
