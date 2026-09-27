import { Cron } from '@nestjs/schedule';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

@WebSocketGateway(8888, {
  cors: {
    origin: '*',
    // origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    // credentials: true,
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  private connections = {};
  private users = {};

  @Cron('*/30 * * * * *') // Runs every 3 seconds
  handleCron() {
    // console.log('Heartbeat event emitted');
    this.server.emit('heartbeat', {
      event: 'heartbeat',
      data: 'Server is alive',
    });
  }

  @Cron('* * * * * *')
  handlePositionUpdate() {
    // todo emit for specific users
    // Object.keys(this.connections).forEach((uuid) => {
    //   const connection = this.connections[uuid];
    //   const message = JSON.stringify(users);
    //   connection.send(message);
    // });
    // console.log('Position update event emitted');
    this.server.emit('users', {
      event: 'userPositionUpdate',
      data: JSON.stringify(this.users),
      //   data: this.users,
      //   const message = JSON.stringify(users);
      //   connection.send(message);
    });
  }

  @SubscribeMessage('connect')
  handleConnection(client: Socket, @MessageBody() data: string): void {
    console.log(`Connection ID: ${client.id}`);
    this.connections[client.id] = { client, userId: null };
  }

  @SubscribeMessage('disconnect')
  handleDisconnect(client: Socket): void {
    console.log(`disconnection ID: ${client.id}`);
    if (this.connections[client.id]) {
      delete this.connections[client.id];
    }
  }

  @SubscribeMessage('addUser')
  addUser(
    @ConnectedSocket() client: Socket,
    @MessageBody() username: any,
  ): WsResponse<boolean> {
    console.log('add user');
    const userId = uuidv4();
    const connectionId = client.id;
    console.log({ username });
    if (username) {
      this.users[userId] = { username };
      this.connections[connectionId].userId = userId;
      //   this.server.emit('userConnected', { username });
    } else {
      console.log('Connection attempt without username');
      return { event: 'addUser', data: true };
    }
    return { event: 'addUser', data: false };
  }

  @SubscribeMessage('updateUserPosition')
  updateUserPosition(
    @ConnectedSocket() client: Socket,
    @MessageBody() coordinates: any,
  ): WsResponse<boolean> {
    console.log('updateUserPosition', { coordinates });
    const connectionId = client.id;
    if (!this.connections[connectionId].userId) {
      console.log('No userId found for connection');
      return { event: 'updateUserPosition', data: false };
    }
    const userId = this.connections[connectionId].userId;
    if (this.users[userId]) {
      this.users[userId].coordinates = coordinates;
      console.log('User position updated', { userId, coordinates });
    }
    // this.users
    // const userId = this.connections[connectionId].userId;

    return { event: 'addUser', data: false };
  }

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    console.log('events was called');
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }
}
