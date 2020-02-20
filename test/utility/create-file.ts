import { gql } from 'apollo-server-core';
import { CreateFileInput } from '../../src/components/file/dto';
import { TestApp } from './create-app';
import { fragments } from './fragments';

// As create file involves up loading file to s3, we only create file node in db assuming its uploaded.
export async function createFile(
  app: TestApp,
  input: Partial<CreateFileInput> = {},
) {
  const file: CreateFileInput = {
    ...input,
  };

  const result = await app.graphql.mutate(
    gql`
      mutation createFile($input: CreateFileInput!) {
        createFile(input: $input) {
          file {
            ...file
          }
        }
      }
      ${fragments.file}
    `,
    {
      input: {
        file,
      },
    },
  );

  const actual: File | undefined = result.createFile?.user;
  expect(actual).toBeTruthy();

  expect(actual.name.valueOf()).toBe(file.name);

  return actual;
}
