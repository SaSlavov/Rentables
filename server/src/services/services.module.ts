import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from 'src/constant/secret';
import { ApartmentsService } from './apartments.service';
import { Apartment } from '../models/entities/apartment.entity'
import { Images } from 'src/models/entities/images.entity';
import { UsersService } from './users.service';
import { User } from 'src/models/entities/user.entity';
import { AuthService } from './auth.service';
import { Token } from 'src/models/entities/token.entity';
import { FavoriteApartmentInfo } from 'src/models/entities/favoriteApartmentInfo.entity';
import { FavoriteInfoService } from './favorite-info.service';
import { ApartmentImagesAsBLOB } from 'src/models/entities/apartmentImagesAsBLOB.entity';
import { JwtStrategy } from './strategy/jwt-strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([Apartment, Images, User, Token, FavoriteApartmentInfo, ApartmentImagesAsBLOB]),
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: {
            expiresIn: '7d',
          }
        }),
      ],
      providers: [ApartmentsService, UsersService, AuthService, FavoriteInfoService, JwtStrategy],
      exports: [ApartmentsService, UsersService, AuthService, FavoriteInfoService]
    
})
export class ServicesModule {}
