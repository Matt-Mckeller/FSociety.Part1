import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RewardableEvent } from '../entities/RewardableEvent.entity';
import { DEMO_EVENT_TYPES } from '../types';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { RewardableEventType } from '../entities/RewardableEventType.entity';
import { ExperienceService } from 'apps/experience/src/experience.service';

@Injectable()
export class RewardActionManagerService {
  constructor(
    @InjectRepository(RewardableEvent, 'main')
    private rewardableEventRepository: Repository<RewardableEvent>,
    @InjectRepository(RewardableEventType, 'main')
    private rewardableEventTypeRepository: Repository<RewardableEventType>,
    @InjectDataSource('main')
    private mainDataSource: DataSource,
    // private experienceService: ExperienceService,
  ) {}

  // Runs every 30 seconds ( will be less frequent than this, also able to be ran on command most likely )
  @Cron('*/30 * * * * *')
  private checkForNewRewardableEvents() {
    // console.log(
    //   'Should be checking for new rewardable events',
    //   new Date().toUTCString(),
    // );
    // go fetch updates from connected systems that have events which should be rewarded
    // handle logic and see if there is anything to add to the queue for processing rewards
  }

  // Runs every 5 seconds
  @Cron('*/5 * * * * *')
  private async processRewardableEvents() {
    // console.log(
    //   'Should be starting processing for new rewardable events',
    //   new Date().toUTCString(),
    // );

    // FOR NOW THIS IS HOW I AM HANDLING THIS, WILL SWITCH TO BETTER QUEUE MANAGEMENT
    // Make sure the current number of events being processed is not higher than the total allowed
    //  to be processed at the same time.
    const totalEventsAllowedToProcessSimultaneously = 100;

    const numberOfEventsCurrentlyProcessing =
      await this.getNumberOfEventsCurrentlyProcessing();
    const amountOfEventsToStartProcessing =
      totalEventsAllowedToProcessSimultaneously -
      numberOfEventsCurrentlyProcessing;

    if (amountOfEventsToStartProcessing <= 0) {
      console.warn(
        'Unable to start new processes, currently processing the maximum amount of events.',
      );
      return false;
    }

    if (numberOfEventsCurrentlyProcessing > 0) {
      // Alternatively could put this on a separate cron instead of calling it in this function
      this.checkHealthOfCurrentlyProcessingEvents();
    }

    // check db for rewardable events to handle
    const eventsToBeginProcessing: RewardableEvent[] =
      await this.rewardableEventRepository.find({
        where: {
          status: 'PENDING',
        },
        take:
          totalEventsAllowedToProcessSimultaneously -
          numberOfEventsCurrentlyProcessing,
        order: {
          createdAt: 'ASC',
        },
      });

    // for each rewardable event that needs to be processed -> go process
    for (const rewardEvent of eventsToBeginProcessing) {
      // No need to wait on async handling
      this.processEvent(rewardEvent);
    }
    return;
  }

  public async createDemoEvent(eventType: string) {
    // Publically accessible by the resolver
    // Validate event type is demo event type and w/e other validation I want
    // Create event
    if (!DEMO_EVENT_TYPES.includes(eventType)) {
      throw new Error(
        'Unable to create demo event, please provide a valid demo event type.',
      );
    }

    const rewardableEventTypeInstance: RewardableEventType =
      await this.getRewardableEventTypeInstance(eventType);

    const rewardableEventInstance = new RewardableEvent();
    rewardableEventInstance.type = rewardableEventTypeInstance;

    const rewardableEvent = await this.rewardableEventRepository.save(
      rewardableEventInstance,
    );
    if (!rewardableEvent) {
      throw new Error('Unable to create event entry.');
    }
    return true;
  }

  private async getRewardableEventTypeInstance(
    eventType: string,
  ): Promise<RewardableEventType> {
    const rewardableEventType = await this.rewardableEventTypeRepository.find({
      where: {
        name: eventType,
      },
    });

    console.log({ rewardableEventType });

    if (!rewardableEventType[0]) {
      throw new Error(
        'Unable to create demo event, unable to find event type entry in database',
      );
    }
    return rewardableEventType[0];
  }

  private createEvent(eventType) {
    // Create vent and save event to db
  }

  private async processEvent(event: RewardableEvent) {
    // Update status to processing, ensure this is an atomic operation
    // event.status = 'PROCESSING';
    // this.rewardableEventRepository.save(event);
    // console.log('dataSource', { datasource: this.mainDataSource });
    // const updateQueryResult = await this.mainDataSource
    //   .createQueryBuilder()
    //   .update(RewardableEvent)
    //   //   .set({
    //   //     status: 'PROCESSING',
    //   //   })
    //   .where('id = :id', { id: event.id })
    //   .andWhere('status = :status', { status: event.status })
    //   .execute();

    console.log({ eventTimestampBefore: event.createdAt });

    const dateString = new Date().toISOString();
    console.log({ dateString, createdAtOriginal: event.createdAt });
    const updateQueryResult = await this.mainDataSource
      .createQueryBuilder()
      .update(RewardableEvent)
      .set({
        // createdAt: dateString,
        status: 'PROCESSING',
      })
      .where('id = :id', { id: event.id })
      //   .andWhere('createdAt = :createdAt', { createdAt: event.createdAt })
      .andWhere('status = :status', { status: event.status })
      .execute();
    if (updateQueryResult.affected === 0) {
      // The update was unsuccessful, likely another process already started this, exit
      throw new Error(
        'Unable to update status of a rewardable event to processing, likely it was already updated from another process.',
      );
    }

    // The update was successful, the event was now marked as processing
    // Update the event to include the newest updates
    event = await this.rewardableEventRepository.findOne({
      where: { id: event.id },
    });
    console.log({ eventTimestampAfter: event.createdAt });
    console.log({ updateQueryResult });
    console.log({ eventType: event.type });

    // why is type not poulated here
    await this.handleRewards();
  }

  async handleRewards() {
    /* see notes for full implementation */
    // call experience service, grant the user experience
    // for now its just experience, for round 1 reward loot with a 33% chance
  }

  private checkHealthOfCurrentlyProcessingEvents() {
    // todo
    // if time for processing has been > x time then trigger a warning
    // if time for processing has been > y time send alert email ( probably not implemented yet )
    //      and probably convert it back to unprocessed, or put into an error/failed state
    return true;
  }
  private async getNumberOfEventsCurrentlyProcessing() {
    return await this.rewardableEventRepository.count({
      where: {
        status: 'PROCESSING',
      },
    });
  }
}
