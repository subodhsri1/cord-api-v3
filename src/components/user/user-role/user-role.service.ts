import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../../core/database.service';
import { generate } from 'shortid';
import {
  CreateUserRoleOutputDto,
  CreateUserRoleInput,
  //CreateUserRoleInputDto,
  ReadUserRoleOutputDto,
  UpdateUserRoleOutputDto,
  DeleteUserRoleOutputDto,
  ReadUserRoleInput,
  UpdateUserRoleInput,
  DeleteUserRoleInput,
} from './user-role.dto';

@Injectable()
export class UserRoleService {
  constructor(private readonly db: DatabaseService) {}

  async create(
    input: CreateUserRoleInput,
  ): Promise<CreateUserRoleOutputDto> {
    const response = new CreateUserRoleOutputDto();
    const session = this.db.driver.session();
    const id = generate();
    await session
      .run(
        'MERGE (usrRole:UserRole {active: true, role: $role}) ON CREATE SET usrRole.id = $id, usrRole.timestamp = datetime() RETURN usrRole.id as id, usrRole.role as role',
        {
          id,
          role: input.role,
        },
      )
      .then(result => {
        response.userRole.id = result.records[0].get('id');
        response.userRole.role = result.records[0].get('role');
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => session.close());

    return response;
  }

  async readOne(
    input: ReadUserRoleInput,
  ): Promise<ReadUserRoleOutputDto> {
    const response = new ReadUserRoleOutputDto();
    const session = this.db.driver.session();
    await session
      .run(
        'MATCH (usrRole:UserRole {active: true }) WHERE usrRole.id = $id RETURN usrRole.id as id, usrRole.role as role',
        {
          id: input.id,
        },
      )
      .then(result => {
        response.userRole.id = result.records[0].get('id');
        response.userRole.role = result.records[0].get('role');
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => session.close());

    return response;
  }

  async update(input: UpdateUserRoleInput): Promise<UpdateUserRoleOutputDto> {
    const response = new UpdateUserRoleOutputDto();
    const session = this.db.driver.session();
    await session
      .run(
        'MATCH (usrRole:UserRole {active: true, id: $id}) SET usrRole.role = $role RETURN usrRole.id as id, usrRole.role as role',
        {
          id: input.id,
          role: input.role,
        },
      )
      .then(result => {
        if (result.records.length > 0) {

          response.userRole.id = result.records[0].get('id');
          response.userRole.role = result.records[0].get('role');
        } else {
          response.userRole = null;
        }
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => session.close());

    return response;
  }

  async delete(input: DeleteUserRoleInput): Promise<DeleteUserRoleOutputDto> {
    const response = new DeleteUserRoleOutputDto();
    const session = this.db.driver.session();
    await session
      .run(
        'MATCH (usrRole:UserRole {active: true, id: $id}) SET usrRole.active = false RETURN usrRole.id as id',
        {
          id: input.id,
        },
      )
      .then(result => {
        response.userRole.id = result.records[0].get('id');
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => session.close());

    return response;
  }
}
