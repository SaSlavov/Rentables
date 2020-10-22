import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControllersModule } from './controllers/controllers.module';
import { ApartmentsService } from './services/apartments.service';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    ControllersModule,
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'rentables',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    ],

})
export class AppModule { }
