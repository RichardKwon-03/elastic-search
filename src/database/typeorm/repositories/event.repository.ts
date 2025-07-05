import { DataSource, Repository, EntityManager } from 'typeorm';
import { Event } from '../entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventRepository extends Repository<Event> {
  constructor(private dataSource: DataSource) {
    super(Event, dataSource.createEntityManager());
  }

  async createEvent(event: Event): Promise<Event> {
    return this.save(event);
  }

  async findById(id: string, manager?: EntityManager): Promise<Event | null> {
    if (manager) {
      return await manager
        .getRepository(Event)
        .createQueryBuilder('event')
        .setLock('pessimistic_write')
        .where('event.id = :id', { id })
        .getOne();
    } else {
      return await this.findOneBy({ id });
    }
  }
}
