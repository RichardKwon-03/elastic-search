import { Injectable, Inject } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_DEFAULT_TOKEN } from './enum';

@Injectable()
export class RedisUtil {
  constructor(
    @Inject(REDIS_DEFAULT_TOKEN) private readonly defaultRedis: Redis,
  ) {
    this.defaultRedis.on('connect', () => {
      console.log('defaultRedis connect');
    });
  }

  async setQuantity(eventId: string, limitCount: number) {
    await this.defaultRedis.set(`event:quantity:${eventId}`, limitCount);
  }

  async getQuantity(eventId: string): Promise<number | null> {
    const value = await this.defaultRedis.get(`event:quantity:${eventId}`);
    if (value === null) return null;
    const num = Number(value);
    return isNaN(num) ? null : num;
  }

  async decreaseQuantityAtomic(
    eventId: string,
    amount: number = 1,
  ): Promise<number> {
    const key = `event:quantity:${eventId}`;
    const left = await this.defaultRedis.eval(
      `
          local left = redis.call('DECRBY', KEYS[1], ARGV[1])
          if tonumber(left) < 0 then
            redis.call('INCRBY', KEYS[1], ARGV[1])
            return -1
          end
          return left
        `,
      1,
      key,
      amount,
    );

    if (Number(left) === -1) {
      throw new Error('재고 부족');
    }
    return Number(left);
  }
}
