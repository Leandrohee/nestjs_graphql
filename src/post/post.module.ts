import { Module } from '@nestjs/common';
import { PostWebSocketGateway } from './post.gateway';
import { PostService } from './post.service';
import { AuthModule } from 'src/auth/auth.module';
import { PostController } from './post.controller';

@Module({
  providers: [PostWebSocketGateway, PostService],
  imports: [AuthModule],
  controllers: [PostController],
})
export class PostModule {}

/**
 * The post module uses websockets while the note modules is a simple rest api
 */
