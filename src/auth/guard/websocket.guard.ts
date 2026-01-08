import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

/**
 * This WebSocket Guard dont protect the connection, only protects the data send in each request.
 *
 * The user that is not authenticated still is going to be allow conection but his messages will not be sended.
 *
 * You can use eather this guard or the gateway WebSocketAuthGateway
 */
@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const client: Socket = context.switchToWs().getClient();

      // Extract token from cookies
      const token = this.extractToken(client);

      if (!token) {
        throw new WsException('Unauthorized: No token provided');
      }

      // Verify the token
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      // Attach user data to the socket for later use
      client.data.user = payload;

      return true;
    } catch (error) {
      throw new WsException('Unauthorized: Invalid token');
    }
  }

  private extractToken(client: Socket): string | null {
    const cookies = client.handshake.headers.cookie;

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
