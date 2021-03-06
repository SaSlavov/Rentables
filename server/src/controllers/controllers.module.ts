import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services/services.module';
import { ApartmentsController } from './apartments.controller';
import { AuthController } from './auth.controller';
import { UsersController } from './users.controller';
import { FavoriteInfoController } from './favorite-info.controller';

@Module({
    imports: [ServicesModule],
    controllers: [ApartmentsController, UsersController, AuthController, FavoriteInfoController]
})
export class ControllersModule {}
