import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { FileService } from './file.service';
import {
  CreateFileNodeInputDto,
  CreateFileNodeOutputDto,
  ReadFileNodeInputDto,
  ReadFileNodeOutputDto,
  UpdateFileNodeInputDto,
  UpdateFileNodeOutputDto,
  DeleteFileNodeInputDto,
  DeleteFileNodeOutputDto,
} from './file.dto';
import { FileNode } from './node';

@Resolver(of => FileNode)
export class FileNodeResolver {
  constructor(private readonly fileService: FileService) {
  }

  @Mutation(returns => CreateFileNodeOutputDto, {
    description: 'Create a FileNode',
  })
  async createFileNode(
    @Args('input') { fileNode: input }: CreateFileNodeInputDto,
  ): Promise<CreateFileNodeOutputDto> {
    return await this.fileService.create(input);
  }

  @Query(returns => ReadFileNodeOutputDto, {
    description: 'Read one FileNode by id',
  })
  async readFileNode(
    @Args('input') { fileNode: input }: ReadFileNodeInputDto,
  ): Promise<ReadFileNodeOutputDto> {
    return await this.fileService.readOne(input);
  }

  @Mutation(returns => UpdateFileNodeOutputDto, {
    description: 'Update an FileNode',
  })
  async updateFileNode(
    @Args('input')
      { fileNode: input }: UpdateFileNodeInputDto,
  ): Promise<UpdateFileNodeOutputDto> {
    return await this.fileService.update(input);
  }

  @Mutation(returns => DeleteFileNodeOutputDto, {
    description: 'Delete an FileNode',
  })
  async deleteFileNode(
    @Args('input')
      { fileNode: input }: DeleteFileNodeInputDto,
  ): Promise<DeleteFileNodeOutputDto> {
    return await this.fileService.delete(input);
  }
}
