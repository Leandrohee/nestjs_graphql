import { JwtService } from '@nestjs/jwt';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'socket.io';

/**
 *
 * This class works like a middleware for the connection for websockets
 *
 * It verify the authenticyty of the jwt on the cookie.
 *
 * This class has to be extended on the normal Websocket class
 */
export abstract class WebSocketAuthGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(protected readonly jwtService: JwtService) {}

  async handleConnection(client: Socket) {
    try {
      // console.log('New connection attempt:', client.id);

      const token = this.extractTokenFromCookie(client);

      if (!token) {
        // console.log('No token provided');
        client.emit('error', { message: 'No token provided' });
        client.disconnect();
        return;
      }

      // Verify the JWT token
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      // Store user data in the socket instance for later use
      client.data.user = payload;

      // console.log('✅ Client connected successfully:', {
      //   socketId: client.id,
      //   userId: payload.sub,
      //   email: payload.email,
      // });
    } catch (error) {
      // console.log('❌ Unauthorized connection attempt:', error.message);
      client.emit('error', { message: 'Authentication failed' });
      client.disconnect();
    }
  }

  async handleDisconnect(client: Socket) {
    const user = client.data.user;
    // console.log('Client disconnected:', {
    //   socketId: client.id,
    //   user: user?.email || 'unknown',
    // });
  }

  private extractTokenFromCookie(client: Socket) {
    const cookies = client?.handshake?.headers?.cookie;

    if (!cookies) return null;

    // Extract the token from the cookie string manually
    const token = cookies
      .split('; ')
      .find((row) => row.startsWith('access_token='))
      ?.split('=')[1];

    if (!token) return null;

    return token;
  }
}

/**
 * 
 * Example of usage of this class (the jwtService super is necessary):
 * 
  
  @WebSocketGateway({ cors: { origin: '*' } })
  export class PostWebSocketGateway extends WebSocketAuthGateway {
    @WebSocketServer() server: Server;
    constructor(
      private readonly postService: PostService,
      jwtService: JwtService,
    ) {
      super(jwtService);
    }

 * 
 */
