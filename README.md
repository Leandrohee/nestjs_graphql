# Example project on how to work with nest + graphql + prisma

# Links to follow with instalations:

- https://docs.nestjs.com/first-steps
- https://www.prisma.io/docs/guides/nestjs
- https://docs.nestjs.com/graphql/quick-start
- https://docs.nestjs.com/security/authentication

# Libs to download

```bash
yarn add prisma -D
yarn add @prisma/client @prisma/adapter-pg pg
yarn add @nestjs/apollo @apollo/server @nestjs/graphql graphql apollo-server-express @nestjs/config
yarn add bcrypt
yarn add @types/bcrypt -D
yarn add class-validator class-transformer
yarn add @as-integrations/express5
yarn add @nestjs/jwt passport-jwt @types/passport-jwt passport
```

# Commands utils

```bash
nest new project_name
nest g module app
nest g service app
nest g provider app
nest g resolver app
npx prisma --help
npx prisma init
npx prisma validate
npx prisma migrate reset
npx prisma migrate dev
npx prisma migrate deploy
npx prisma generate
```
