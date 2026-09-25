import { Injectable, Logger } from '@nestjs/common';
import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import type { WSEvent } from '@4eye/scene-studio-shared';
import type { WebSocket, Server } from 'ws';

@Injectable()
@WebSocketGateway({ path: '/ws' })
export class WsGateway implements OnGatewayConnection {
  private readonly log = new Logger(WsGateway.name);

  @WebSocketServer()
  server!: Server;

  handleConnection(client: WebSocket) {
    this.log.log(`client connected (total: ${this.server.clients.size})`);
    client.on('close', () => {
      this.log.log(`client disconnected (total: ${this.server.clients.size})`);
    });
  }

  broadcast(event: WSEvent): void {
    // In CLI / non-HTTP contexts the WS server is never initialised.
    if (!this.server || !this.server.clients) return;
    const payload = JSON.stringify(event);
    for (const client of this.server.clients) {
      if (client.readyState === 1 /* OPEN */) {
        client.send(payload);
      }
    }
  }
}
