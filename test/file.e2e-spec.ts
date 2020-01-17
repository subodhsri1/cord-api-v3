import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { isValid, generate } from 'shortid';

async function createFile(
  app: INestApplication,
  fileName: string,
): Promise<string> {
  let fileId = '';
  await request(app.getHttpServer())
    .post('/graphql')
    .send({
      operationName: null,
      query: `
    mutation {
      createFile (input: { file: { name: "${fileName}" } }){
        file {
        id,
        name
        }
      }
    }
    `,
    })
    .then(({ body }) => {
      fileId = body.data.createFile.file.id;
    });
  return fileId;
}

describe('File e2e', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('create file', async () => {
    const fileName = 'fileName' + generate();
    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: `
        mutation {
          createFile (input: { file: { name: "${fileName}" } }){
            file {
            id
            name
            }
          }
        }
        `,
      })
      .expect(({ body }) => {
        const fileId = body.data.createFile.file.id;
        expect(isValid(fileId)).toBe(true);
        expect(body.data.createFile.file.name).toBe(fileName);
      })
      .expect(200);
  });

  it('read one file by id', async () => {
    const fileName = 'fileName' + Date.now();

    // create file first
    const fileId = await createFile(app, fileName);

    // test reading new org
    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: `
        query {
          readFile ( input: { file: { id: "${fileId}" } }){
            file{
            id
            name
            }
          }
        }
        `,
      })
      .expect(({ body }) => {
        expect(body.data.readFile.file.id).toBe(fileId);
        expect(body.data.readFile.file.name).toBe(fileName);
      })
      .expect(200);
  });

  it('update file', async () => {
    const fileName = 'fileOld' + Date.now();
    const fileNameNew = 'fileNew' + Date.now();

    // create file first
    const fileId = await createFile(app, fileName);

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: `
        mutation {
          updateFile (input: { file: {
            id: "${fileId}",
            name: "${fileNameNew}",
            deptId: null,
            status: null,
            location: null,
            publicLocation: null,
            mouStart: null,
            mouEnd: null,
            partnerships: null,
            sensitivity: null,
            team: null,
            budgets: null,
            estimatedSubmission: null,
            engagements: null,
          } }){
            file {
            id
            name
            }
          }
        }
        `,
      })
      .expect(({ body }) => {
        expect(body.data.updateFile.file.id).toBe(fileId);
        expect(body.data.updateFile.file.name).toBe(fileNameNew);
      })
      .expect(200);
  });

  it('delete file', async () => {
    const fileName = 'fileName' + Date.now();

    // create file first
    const fileId = await createFile(app, fileName);

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: `
        mutation {
          deleteFile (input: { file: { id: "${fileId}" } }){
            file {
            id
            }
          }
        }
        `,
      })
      .expect(({ body }) => {
        expect(body.data.deleteFile.file.id).toBe(fileId);
      })
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
