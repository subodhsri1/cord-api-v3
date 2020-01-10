import { Field, InputType, ObjectType } from 'type-graphql';
import { Role } from '../../../model/role';

// CREATE

@InputType()
export class CreateUserRoleInput {
  @Field(type => Role)
  role: Role;
}

@InputType()
export class CreateUserRoleInputDto {
  @Field()
  userRole: CreateUserRoleInput;
}

@ObjectType()
export class CreateUserRoleOutput {
    @Field(type => String)
    id: string;
    @Field(type => Role)
    role: Role;
}

@ObjectType()
export class CreateUserRoleOutputDto {
  @Field({nullable: true}) // nullable in case of error
  userRole: CreateUserRoleOutput;
  constructor(){
      this.userRole = new CreateUserRoleOutput();
  }
}

// READ

@InputType()
export class ReadUserRoleInput {
  @Field(type => String)
  id: string;
}

@InputType()
export class ReadUserRoleInputDto {
  @Field()
  userRole: ReadUserRoleInput;
}

@ObjectType()
export class ReadUserRoleOutput {
  @Field(type => String)
  id: string;
  @Field(type => Role)
  role: string;
}

@ObjectType()
export class ReadUserRoleOutputDto {
  @Field({ nullable: true }) // nullable in case of error
  userRole: ReadUserRoleOutput;
  constructor() {
    this.userRole = new ReadUserRoleOutput();
  }
}

// UPDATE

@InputType()
export class UpdateUserRoleInput {
  @Field(type => String)
  id: string;
  @Field(type => Role)
  role: string;
}

@InputType()
export class UpdateUserRoleInputDto {
  @Field()
  userRole: UpdateUserRoleInput;
}

@ObjectType()
export class UpdateUserRoleOutput {
  @Field(type => String)
  id: string;
  @Field(type => Role)
  role: string;
}

@ObjectType()
export class UpdateUserRoleOutputDto {
  @Field({ nullable: true }) // nullable in case of error
  userRole: UpdateUserRoleOutput;
  constructor() {
    this.userRole = new UpdateUserRoleOutput();
  }
}

// DELETE

@InputType()
export class DeleteUserRoleInput {
  @Field(type => String)
  id: string;
}

@InputType()
export class DeleteUserRoleInputDto {
  @Field()
  userRole: DeleteUserRoleInput;
}

@ObjectType()
export class DeleteUserRoleOutput {
  @Field(type => String)
  id: string;
}

@ObjectType()
export class DeleteUserRoleOutputDto {
  @Field({ nullable: true }) // nullable in case of error
  userRole: DeleteUserRoleOutput;
  constructor() {
    this.userRole = new DeleteUserRoleOutput();
  }
}
