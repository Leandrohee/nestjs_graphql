import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthModule } from 'src/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtHeadersGuard } from 'src/auth/guard/jwt-headers.guard';
import { JwtCookiesGuard } from 'src/auth/guard/jwt-cookies.guard';

@Module({
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      // useClass: JwtHeadersGuard,
      useClass: JwtCookiesGuard,
    },
  ],
  controllers: [AppController],
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      graphiql: true,
      introspection: true,
      context: ({ req, res }) => ({ req, res }), //This line is mandatory for graphql to handle req and res
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
