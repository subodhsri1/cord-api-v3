import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user';
import { UserService } from './user.service';
import { 
    CreateUserInputDto, 
    CreateUserOutputDto,
    ReadUserInputDto,
    ReadUserOutputDto,
    UpdateUserInputDto,
    UpdateUserOutputDto,
    DeleteUserInputDto,
    DeleteUserOutputDto, 
} from './user.dto';


@Resolver(of => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Mutation(returns => CreateUserOutputDto, {
        description: 'Create a user',
      })
      async createUser(
        @Args('input') { user: input }: CreateUserInputDto,
      ): Promise<CreateUserOutputDto> {
        return await this.userService.create(input);
      }
    
      @Query(returns => ReadUserOutputDto, {
        description: 'Read one user by id',
      })
      async readUser(
        @Args('input') { user: input }: ReadUserInputDto,
      ): Promise<ReadUserOutputDto> {
        return await this.userService.readOne(input);
      }
    
      @Mutation(returns => UpdateUserOutputDto, {
        description: 'Update a user',
      })
      async updateUser(
        @Args('input')
        { user: input }: UpdateUserInputDto,
      ): Promise<UpdateUserOutputDto> {
        return await this.userService.update(input);
      }
    
      @Mutation(returns => DeleteUserOutputDto, {
        description: 'Delete a user',
      })
      async deleteUser(
        @Args('input')
        { user: input }: DeleteUserInputDto,
      ): Promise<DeleteUserOutputDto> {
        return await this.userService.delete(input);
      }
    }