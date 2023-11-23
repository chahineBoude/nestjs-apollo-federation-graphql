import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveReference,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from './guard/jwt.guard';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query()
  async users() {
    return await this.userService.getUsers();
  }

  @Query()
  async user(@Args('id') id: number) {
    return await this.userService.getUser(id);
  }

  @Query()
  async logIn(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const token = await this.userService.logIn(email, password);
    return token.access_token.toString();
  }

  @Mutation()
  async createUser(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return await this.userService.createUser(email, password);
  }

  @Mutation()
  async modifyName(
    @Args('id') id: number,
    @Args('firstName') firstName?: string,
    @Args('middleName') middleName?: string,
    @Args('lastName') lastName?: string,
  ) {
    return await this.userService.modifyName(
      id,
      firstName,
      middleName,
      lastName,
    );
  }

  @Mutation()
  async deleteUser(@Args('id') id: number) {
    return await this.userService.deleteUser(id);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: number }) {
    return this.userService.getUser(reference.id);
  }
}
