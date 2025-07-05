import { DataSource, Repository } from 'typeorm';
import { EventReservation } from '../entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventRepository extends Repository<EventReservation> {
  constructor(private dataSource: DataSource) {
    super(EventReservation, dataSource.createEntityManager());
  }

  async createEventReservation(
    eventReservation: EventReservation,
  ): Promise<EventReservation> {
    return this.save(eventReservation);
  }

  async findByUserIdWithEventId(
    userId: string,
    eventId: string,
  ): Promise<EventReservation | null> {
    return await this.findOneBy({ userId, eventId });
  }

  async findByEventId(
    eventId: string,
    page = 1,
    pageSize = 20,
  ): Promise<{ data: EventReservation[]; total: number }> {
    const [data, total] = await this.createQueryBuilder('reservation')
      .where('reservation.eventId = :eventId', { eventId })
      .orderBy('reservation.reservedAt', 'ASC')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return { data, total };
  }
}
