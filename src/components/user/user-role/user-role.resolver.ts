import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserRole } from './user-role';
import { UserRoleService } from './user-role.service';
import { 
    CreateUserRoleInputDto, 
    CreateUserRoleOutputDto,
    ReadUserRoleInputDto,
    ReadUserRoleOutputDto,
    UpdateUserRoleInputDto,
    UpdateUserRoleOutputDto,
    DeleteUserRoleInputDto,
    DeleteUserRoleOutputDto, 
} from './user-role.dto';


@Resolver(of => UserRole)
export class UserRoleResolver {
    constructor(private readonly langService: UserRoleService) {}

    @Mutation(returns => CreateUserRoleOutputDto, {
        description: 'Create a user role',
      })
      async createUserRole(
        @Args('input') { userRole: input }: CreateUserRoleInputDto,
      ): Promise<CreateUserRoleOutputDto> {
        return await this.langService.create(input);
      }
    
      @Query(returns => ReadUserRoleOutputDto, {
        description: 'Read one user role by id',
      })
      async readUserRole(
        @Args('input') { userRole: input }: ReadUserRoleInputDto,
      ): Promise<ReadUserRoleOutputDto> {
        return await this.langService.readOne(input);
      }
    
      @Mutation(returns => UpdateUserRoleOutputDto, {
        description: 'Update a user role',
      })
      async updateUserRole(
        @Args('input')
        { userRole: input }: UpdateUserRoleInputDto,
      ): Promise<UpdateUserRoleOutputDto> {
        return await this.langService.update(input);
      }
    
      @Mutation(returns => DeleteUserRoleOutputDto, {
        description: 'Delete a user role',
      })
      async deleteUserRole(
        @Args('input')
        { userRole: input }: DeleteUserRoleInputDto,
      ): Promise<DeleteUserRoleOutputDto> {
        return await this.langService.delete(input);
      }
    }