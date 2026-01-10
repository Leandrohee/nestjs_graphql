import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { PostService } from './post.service';
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from 'src/auth/guard/websocket.guard';
import { JwtService } from '@nestjs/jwt';
import { WebSocketAuthGateway } from 'src/auth/gateway/websocket-auth.gateway';

// @UseGuards(WsJwtGuard)
@WebSocketGateway({
  cors: { origin: 'http://localhost:5200', credentials: true },
})
export class PostWebSocketGateway extends WebSocketAuthGateway {
  @WebSocketServer() server: Server;
  constructor(
    private readonly postService: PostService,
    jwtService: JwtService,
  ) {
    super(jwtService);
  }

  @SubscribeMessage('createPost')
  async handleCreatePost(
    @MessageBody() data: { content: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const user = client.data.user;
      const postCreated = await this.postService.createPost(data, user);

      //Broadcasting the new post to all the others clients
      this.server.emit('newPost', postCreated);

      return postCreated;
    } catch (error) {
      //Send error back to the sender
      throw new WsException(error.message);
    }
  }

  /**
   *
   * This method is to for tests purpose is just to be tested in a client such as
   * insomnia to know if the websockets is running correctly
   *
   * eventTest is the name of the event for the client to send
   * replyEventTest is the name of event for the server to send
   */
  @SubscribeMessage('eventTest')
  handleEventTest(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(client.data.user);

    client.emit(
      'replyEventTest',
      'This is a reply test to only the sender. It will be showed only to the sender',
    );
    client.broadcast.emit(
      'replyEventTest',
      'This is a reply to everyone except the sender',
    );
    this.server.emit(
      'replyEventTest',
      'This is a broadcast reply to everyone inluding the sender',
    );
  }
}
