import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from 'src/constant/secret';
import { ApartmentsService } from './apartments.service';
import { Apartment } from '../models/entities/apartment.entity'

@Module({
    imports: [
        TypeOrmModule.forFeature([Apartment]),
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: {
            expiresIn: '7d',
          }
        }),
      ],
      providers: [ApartmentsService],
      exports: [ApartmentsService]
    
})
export class ServicesModule {}
