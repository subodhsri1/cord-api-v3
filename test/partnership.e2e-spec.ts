import * as request from 'supertest';

import { Test, TestingModule } from '@nestjs/testing';
import { generate, isValid } from 'shortid';

import { AppModule } from '../src/app.module';
import { CreatePartnershipInput } from '../src/components/partnership/partnership.dto';
import { INestApplication } from '@nestjs/common';
import { PartnershipAgreementStatus } from 'src/components/partnership/agreement-status';

async function createPartnership(app: INestApplication): Promise<string> {
  let partnershipId = '';
  await request(app.getHttpServer())
    .post('/graphql')
    .send({
      operationName: null,
      // TODO : Use Later
      // query: `
      //   mutation {
      //     createPartnership(
      //       input: {
      //         partnership: {
      //           agreementStatus: AwaitingSignature
      //           mouStatus: Signed
      //           mouStart: null
      //           mouEnd: null
      //           organization: organization
      //           types: [Managing, Technical]
      //         }
      //       }
      //     ) {
      //       partnership {
      //         id
      //       }
      //     }
      //   }
      //   `,
      query: `
          mutation {
            createPartnership (input: { partnership: {} }){
              partnership {
                id
              }
            }
          }
          `,
    })
    .then(({ body }) => {
      partnershipId = body.data.createPartnership.partnership.id;
    });
  return partnershipId;
}

describe('Partnership e2e', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
.compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // CREATE PARTNERSHIP
  it('create partnership', () => {
    const orgName = 'partnershipName_' + generate();
    const organization = {
      id: generate(),
      name: orgName,
      owningOrg: null,
      createdAt: null,
      createdBy: null,
    };
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: `
        mutation {
          createPartnership (input: { partnership: {  } }){
            partnership {
              id
            }
          }
        }
        `,
      })
      .expect(({ body }) => {
        const partnershipId = body.data.createPartnership.partnership.id;
        expect(isValid(partnershipId)).toBe(true);
      })
      .expect(200);
  });

  // READ PARTNERSHIP
  it('read one partnership by id', async () => {
    const newPartShip = new CreatePartnershipInput();
    const orgName = 'partnershipName_' + generate();
    newPartShip.organization = {
      id: generate(),
      name: orgName,
      owningOrg: null,
      createdAt: null,
      createdBy: null,
    };
    const partnershipId = await createPartnership(app);

    // test reading new partnership
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: `
        query {
          readPartnership ( input: { partnership: { id: "${partnershipId}" } }){
            partnership {
              id
            }
          }
        }
        `,
      })
      .expect(({ body }) => {
        expect(body.data.readPartnership.partnership.id).toBe(partnershipId);
      })
      .expect(200);
  });

  // UPDATE PARTNERSHIP
  it('update partnership', async () => {
    const partnershipId = await createPartnership(app);
    const agreementStatus: PartnershipAgreementStatus = PartnershipAgreementStatus.NotAttached;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: `
        mutation {
          updatePartnership (input: { partnership: {id: "${partnershipId}",
          agreementStatus: ${agreementStatus} } } }){
            partnership {
              id
              agreementStatus
            }
          }
        }
        `,
      })
      .expect(({ body }) => {
        console.log(JSON.stringify(body));
        expect(body.data.updatePartnership.partnership.id).toBe(partnershipId);
        expect(body.data.updatePartnership.partnership.agreementStatus).toBe(agreementStatus);
      })
      .expect(200);
  });

  // DELETE PARTNERSHIP
  it('delete partnership', async () => {
    const newPartShip = new CreatePartnershipInput();
    const orgName = 'partnershipName_' + generate();
    newPartShip.organization = {
      id: generate(),
      name: orgName,
      owningOrg: null,
      createdAt: null,
      createdBy: null,
    };
    const partnershipId = await createPartnership(app);

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: `
        mutation {
          deletePartnership (input: { partnership: { id: "${partnershipId}" } }){
            partnership {
            id
            }
          }
        }
        `,
      })
      .expect(({ body }) => {
        expect(body.data.deletePartnership.partnership.id).toBe(partnershipId);
      })
      .expect(200);
  });

  // LIST PARTNERSHIPS
  // it('list view of partnerships', async () => {
  //   // create a bunch of partnership
  //   const totalOrgs = 10;
  //   const orgs: Partnership[] = [];
  //   for (let i = 0; i < totalOrgs; i++) {
  //     const newPartShip = new Partnership();
  //     const orgName = 'partnershipName_' + generate();
  //     newPartShip.organization = {id: generate(), name : orgName, owningOrg: null, createdAt: null, createdBy: null};
  //     //newPartShip.id = await createPartnership(app, newPartShip.organization);
  //     orgs.push(newPartShip);
  //   }

  //   // test reading new partnership
  //   return request(app.getHttpServer())
  //     .post('/graphql')
  //     .send({
  //       operationName: null,
  //       query: `
  //       query {
  //         partnerships(
  //           input: {
  //             query: { filter: "", page: 0, count: ${totalOrgs}, sort: "organization", order: "asc" }
  //           }
  //         ) {
  //           partnerships {
  //             id
  //             organization
  //           }
  //         }
  //       }
  //         `,
  //     })
  //     .expect(({ body }) => {
  //       expect(body.data.partnerships.partnerships.length).toBe(totalOrgs);
  //     })
  //     .expect(200);
  // });

  afterAll(async () => {
    await app.close();
  });
});