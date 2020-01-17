import { ObjectType, Field, InputType } from 'type-graphql';

/* This DTO needs to support CRUD Directory and CRUD File.  In the DB the Directory and File Types are FileNodes with additional fields.
*/

// CREATE
@InputType()
export class CreateFileNodeInput {
  @Field(type => String)
  name: string;
}

@InputType()
export class CreateFileNodeInputDto {
  @Field()
  fileNode: CreateFileNodeInput;
}

@ObjectType()
export class CreateFileNodeOutput {
  @Field(type => String)
  id: string;
  @Field(type => String)
  name: string;
}

@ObjectType()
export class CreateFileNodeOutputDto {
  @Field({ nullable: true }) // nullable in case of error
  fileNode: CreateFileNodeOutput;

  constructor() {
    this.fileNode = new CreateFileNodeOutput();
  }
}

// READ

@InputType()
export class ReadFileNodeInput {
  @Field(type => String)
  id: string;
}

@InputType()
export class ReadFileNodeInputDto {
  @Field()
  fileNode: ReadFileNodeInput;
}

@ObjectType()
export class ReadFileNodeOutput {
  @Field(type => String)
  id: string;
  @Field(type => String)
  name: string;
}

@ObjectType()
export class ReadFileNodeOutputDto {
  @Field({ nullable: true }) // nullable in case of error
  fileNode: ReadFileNodeOutput;

  constructor() {
    this.fileNode = new ReadFileNodeOutput();
  }
}

// UPDATE

@InputType()
export class UpdateFileNodeInput {
  @Field(type => String)
  id: string;
  @Field(type => String)
  name: string;
}

@InputType()
export class UpdateFileNodeInputDto {
  @Field()
  fileNode: UpdateFileNodeInput;
}

@ObjectType()
export class UpdateFileNodeOutput {
  @Field(type => String)
  id: string;
  @Field(type => String)
  name: string;
}

@ObjectType()
export class UpdateFileNodeOutputDto {
  @Field({ nullable: true }) // nullable in case of error
  fileNode: UpdateFileNodeOutput;

  constructor() {
    this.fileNode = new UpdateFileNodeOutput();
  }
}

// DELETE

@InputType()
export class DeleteFileNodeInput {
  @Field(type => String)
  id: string;
}

@InputType()
export class DeleteFileNodeInputDto {
  @Field()
  fileNode: DeleteFileNodeInput;
}

@ObjectType()
export class DeleteFileNodeOutput {
  @Field(type => String)
  id: string;
}

@ObjectType()
export class DeleteFileNodeOutputDto {
  @Field({ nullable: true }) // nullable in case of error
  fileNode: DeleteFileNodeOutput;

  constructor() {
    this.fileNode = new DeleteFileNodeOutput();
  }
}
