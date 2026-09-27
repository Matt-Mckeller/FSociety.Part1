import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnalyticsEvent } from './entities/AnalyticsEvent.entity';
import { Repository } from 'typeorm';
import { NewAnalyticsEventInput } from './dto/new-analytics-event.input';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(AnalyticsEvent, 'analytics')
    private readonly analyticsRepository: Repository<AnalyticsEvent>,
  ) {}

  async createEvent(event: NewAnalyticsEventInput): Promise<AnalyticsEvent> {
    return this.analyticsRepository.save(event);
  }

  async getEvents(): Promise<AnalyticsEvent[]> {
    return this.analyticsRepository.find();
  }
}
