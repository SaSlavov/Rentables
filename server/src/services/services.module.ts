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

@Module({
    imports: [
        TypeOrmModule.forFeature([Apartment, Images, User, Token]),
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: {
            expiresIn: '7d',
          }
        }),
      ],
      providers: [ApartmentsService, UsersService, AuthService],
      exports: [ApartmentsService, UsersService, AuthService]
    
})
export class ServicesModule {}
