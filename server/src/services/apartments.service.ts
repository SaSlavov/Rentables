import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Apartment } from 'src/models/entities/apartment.entity';
import { User } from 'src/models/entities/user.entity';
import { CreateApartmentDTO } from '../models/dtos/apartmentDTOs/create-apartment.dto'
import { LessThan, Not, Repository } from 'typeorm';
import { query } from 'express';
import { Images } from 'src/models/entities/images.entity';

@Injectable()
export class ApartmentsService {

    constructor(
        @InjectRepository(Apartment) private readonly apartmentRepository: Repository<Apartment>,
        @InjectRepository(Images) private readonly imagesRepository: Repository<Images>,
    ) { }
    async createApartment(userId, files, CreateApartmentDTO: any): Promise<Apartment> {

        const images = new Images()
        images.images = files.map(image => image.filename.toString()).join(' ')
        const createdImages = await this.imagesRepository.save(images)

        const apartment = new Apartment();
        apartment.title = CreateApartmentDTO.title;
        apartment.price = CreateApartmentDTO.price;
        apartment.rooms = CreateApartmentDTO.rooms;
        apartment.area = CreateApartmentDTO.area;
        apartment.images = createdImages;
       
        const createdApartment = await this.apartmentRepository.save(apartment);
        return createdApartment

    };

    async searchApartments(queryData: any): Promise<any> {
        const foundApartment = await this.apartmentRepository.find({
            where: {
                area: queryData.area,
                rooms: queryData.rooms, // number?
                price: Not(LessThan(queryData.priceMin)) && LessThan(queryData.priceMax)
            },
            relations: ['images']
        })

        return foundApartment;
        
    }
}
