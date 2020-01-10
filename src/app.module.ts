import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AreaResolver } from './components/area/area.resolver';
import { AreaService } from './components/area/area.service';
import { RegionResolver } from './components/region/region.resolver';
import { RegionService } from './components/region/region.service';
import { DatabaseService } from './core/database.service';
import { OrganizationService } from './components/organization/organization.service';
import { OrganizationResolver } from './components/organization/organization.resolver';
import { LanguageResolver } from './components/language/language.resolver';
import { LanguageService } from './components/language/language.service';
import { LocationResolver } from './components/location/location.resolver';
import { DatabaseUtility } from './common/database-utility';
import { LocationService } from './components/location/location.service';
import { UserResolver } from './components/user/user.resolver';
import { UserService } from './components/user/user.service';
import { UserRoleResolver } from './components/user/user-role/user-role.resolver';
import { UserRoleService } from './components/user/user-role/user-role.service';

@Module({
  imports: [GraphQLModule.forRoot({ autoSchemaFile: 'schema.gql' })],
  controllers: [],
  providers: [
    AreaResolver,
    AreaService,
    DatabaseService,
    DatabaseUtility,
    OrganizationResolver,
    OrganizationService,
    LanguageResolver,
    LanguageService,
    LocationResolver,
    LocationService,
    RegionService,
    RegionResolver,
    UserService,
    UserResolver,
    UserRoleResolver,
    UserRoleService,
  ],
})
export class AppModule {}
