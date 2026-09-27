import { Module } from '@nestjs/common';
import { WebsocketsController } from './websockets.controller';
import { WebsocketsService } from './websockets.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventsGateway } from './gateways/events';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    // ClientsModule.register([
    //   {
    //     name: 'MATH_SERVICE',
    //     transport: Transport.REDIS,
    //     options: {
    //       host: 'localhost',
    //       port: 6379,
    //     },
    //   },
    // ]),
    ScheduleModule.forRoot(),
  ],
  controllers: [WebsocketsController],
  providers: [WebsocketsService, EventsGateway],
})
export class WebsocketsModule {}
