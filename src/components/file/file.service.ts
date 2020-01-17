import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../core/database.service';
import { generate } from 'shortid';
import {
  CreateFileNodeOutputDto,
  ReadFileNodeOutputDto,
  UpdateFileNodeOutputDto,
  DeleteFileNodeOutputDto,
  CreateFileNodeInput,
  ReadFileNodeInput,
  UpdateFileNodeInput,
  DeleteFileNodeInput,
} from './file.dto';

@Injectable()
export class FileService {
  constructor(private readonly db: DatabaseService) {
  }

  async create(
    input: CreateFileNodeInput,
  ): Promise<CreateFileNodeOutputDto> {
    const response = new CreateFileNodeOutputDto();
    const session = this.db.driver.session();
    const id = generate();
    await session
      .run(
        'MERGE (fileNode:FileNode {active: true, owningOrg: "seedcompany", name: $name}) ON CREATE SET fileNode.id = $id, fileNode.timestamp = datetime() RETURN fileNode.id as id, fileNode.name as name',
        {
          id,
          name: input.name,
        },
      )
      .then(result => {
        response.fileNode.id = result.records[0].get('id');
        response.fileNode.name = result.records[0].get('name');
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => session.close());

    return response;
  }

  async readOne(
    input: ReadFileNodeInput,
  ): Promise<ReadFileNodeOutputDto> {
    const response = new ReadFileNodeOutputDto();
    const session = this.db.driver.session();
    await session
      .run(
        'MATCH (fileNode:FileNode {active: true, owningOrg: "seedcompany"}) WHERE fileNode.id = $id RETURN fileNode.id as id, fileNode.name as name',
        {
          id: input.id,
        },
      )
      .then(result => {
        response.fileNode.id = result.records[0].get('id');
        response.fileNode.name = result.records[0].get('name');
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => session.close());

    return response;
  }

  async update(input: UpdateFileNodeInput): Promise<UpdateFileNodeOutputDto> {
    const response = new UpdateFileNodeOutputDto();
    const session = this.db.driver.session();
    await session
      .run(
        'MATCH (fileNode:FileNode {active: true, owningOrg: "seedcompany", id: $id}) SET fileNode.name = $name RETURN fileNode.id as id, fileNode.name as name',
        {
          id: input.id,
          name: input.name,
        },
      )
      .then(result => {
        if (result.records.length > 0) {
          response.fileNode.id = result.records[0].get('id');
          response.fileNode.name = result.records[0].get('name');
        } else {
          response.fileNode = null;
        }
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => session.close());

    return response;
  }

  async delete(input: DeleteFileNodeInput): Promise<DeleteFileNodeOutputDto> {
    const response = new DeleteFileNodeOutputDto();
    const session = this.db.driver.session();
    await session
      .run(
        'MATCH (fileNode:FileNode {active: true, owningOrg: "seedcompany", id: $id}) SET fileNode.active = false RETURN fileNode.id as id',
        {
          id: input.id,
        },
      )
      .then(result => {
        response.fileNode.id = result.records[0].get('id');
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => session.close());

    return response;
  }
}
