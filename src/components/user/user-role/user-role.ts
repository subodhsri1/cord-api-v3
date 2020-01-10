import { Field, ObjectType } from 'type-graphql';
import { Location } from '../../../model/location';
import {  Role } from '../../../model/role';

@ObjectType()
export class UserRole {
  @Field()
  role: Role;

  @Field()
  locations: Location[];

  static from(userRole: UserRole) {
    return Object.assign(new UserRole(), userRole);
  }
}