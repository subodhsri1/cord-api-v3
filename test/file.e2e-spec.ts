import { Connection } from 'cypher-query-builder';
import { FileNodeType } from '../src/components/file/dto';
import { User } from '../src/components/user';
import {
  TestApp,
  createTestApp,
  createSession,
  createUser,
  fragments,
} from './utility';
import { gql } from 'apollo-server-core';
import { generate, isValid } from 'shortid';
import { times } from 'lodash';
import { createFile } from './utility/create-file';

describe('File e2e', () => {
  let app: TestApp;

  beforeAll(async () => {
    app = await createTestApp();
  });

  it('read file node by id', async () => {
    const token = await createSession(app);

    const dbService = await app.get(Connection);
    const testFile = await dbService
      .query()
      .raw(`
        CREATE (file:FileNode { id: $id, type: $type, name: $name})
        RETURN file
        `,
        {
          id: generate(),
          type: FileNodeType.File,
          name: 'test-file',
        })
      .first();

    // since file is created, it can be read.
    const result = await app.graphql.mutate(
      gql`
        mutation createFile( $input: CreateFileInput!) {
          file {
            type
          }
        }
        ${fragments.file}
      `,
      {
        input: {
          uploadId: testFile.file.properties.id,
          parentId: 'hello',
          name: 'test-file',
        },
      });
    
    const actual = result;
    expect(actual).toBeTruthy();

    return true;
  });

  afterAll(async () => {
    await app.close();
  });
});
