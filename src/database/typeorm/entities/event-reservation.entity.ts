import {
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Event } from './event.entity';

@Entity('event_reservation')
@Unique(['eventId', 'userId'])
export class EventReservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  eventId: string;

  @Column()
  userId: string;

  @CreateDateColumn()
  reservedAt: Date;

  @ManyToOne(() => Event)
  @JoinColumn({ name: 'eventId' })
  event: Event;
}
