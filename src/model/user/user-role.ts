import { Field, ObjectType } from 'type-graphql';
import { Location } from '../location';
import { Role } from '../role';

@ObjectType()
export class UserRole implements IUserRole {
  @Field()
  role: Role;

  @Field()
  locations: Location[];

  static from(userRole: UserRole) {
    return Object.assign(new UserRole(), userRole);
  }
}

export interface IUserRole {
  role: Role;
  locations: Location[];
}
