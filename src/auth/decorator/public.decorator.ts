import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

/**

1. This decorator can be use in the Query

  @Public()
  @Query(() => [UserEntity])

2. This decorator can be use in the Resolver
  @Public()
  @Resolver(() => UserEntity)


*/
