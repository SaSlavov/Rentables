import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Apartment } from 'src/models/entities/apartment.entity';
import { User } from 'src/models/entities/user.entity';
import { CreateApartmentDTO } from '../models/dtos/apartmentDTOs/create-apartment.dto'
import { Repository } from 'typeorm';

@Injectable()
export class ApartmentsService {

    constructor(
        @InjectRepository(Apartment) private readonly apartmentRepository: Repository<Apartment>,
        // @InjectRepository(User) private readonly usersRepository: Repository<User>,
    ) { }
    async createApartment(userId, CreateApartmentDTO: CreateApartmentDTO): Promise<Apartment> {

        // const apartment = this.apartmentRepository.create(apartmentData)
        const apartment = new Apartment();
        apartment.title = CreateApartmentDTO.title;
        apartment.price = CreateApartmentDTO.price;
        apartment.rooms = CreateApartmentDTO.rooms;
        apartment.area = CreateApartmentDTO.area;
       
        const createdApartment = await this.apartmentRepository.save(apartment);
        return createdApartment

    };
}
