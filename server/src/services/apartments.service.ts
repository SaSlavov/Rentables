import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Apartment } from 'src/models/entities/apartment.entity';
import { User } from 'src/models/entities/user.entity';
import { CreateApartmentDTO } from '../models/dtos/apartmentDTOs/create-apartment.dto'
import { LessThan, MoreThan, Not, Repository } from 'typeorm';
import { query } from 'express';
import { Images } from 'src/models/entities/images.entity';

@Injectable()
export class ApartmentsService {

    constructor(
        @InjectRepository(Apartment) private readonly apartmentRepository: Repository<Apartment>,
        @InjectRepository(Images) private readonly imagesRepository: Repository<Images>,
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
    ) { }
    async createApartment(userId, files, CreateApartmentDTO: CreateApartmentDTO): Promise<Apartment> {
        console.log(files)
        const images = new Images()
        images.images = files.map(image => image.filename.toString()).join(' ')
        const createdImages = await this.imagesRepository.save(images)
        const user = await this.usersRepository.findOne({
            where: {
                id: userId
            }
        })

        const apartment = new Apartment();
        apartment.title = CreateApartmentDTO.title;
        apartment.price = CreateApartmentDTO.price;
        apartment.rooms = CreateApartmentDTO.rooms;
        apartment.area = CreateApartmentDTO.area;
        apartment.floor = CreateApartmentDTO.floor;
        apartment.description = CreateApartmentDTO.description;
        apartment.furnished = CreateApartmentDTO.furnished;
        apartment.constructionType = CreateApartmentDTO.constructionType;
        apartment.parking = CreateApartmentDTO.parking;
        apartment.images = createdImages;
        apartment.author = user;
       
        const createdApartment = await this.apartmentRepository.save(apartment);
        return createdApartment

    };

    async searchApartments(queryData: any): Promise<any> {
        const foundApartment = await this.apartmentRepository.find({
            where: {
                area: queryData.area,
                rooms: +queryData.rooms === 0 ? MoreThan(0) : +queryData.rooms, // number?
                price: (+queryData.priceMin === 0 && +queryData.priceMax === 0) ? MoreThan(0) : Not(LessThan(queryData.priceMin)) && LessThan(queryData.priceMax)
            },
            relations: ['images']
        })

        return foundApartment;
        
    }
    async getApartmentById(apartmentId: number): Promise<Apartment> {
        const foundApartment = await this.apartmentRepository.findOne({
            where: {
                id: apartmentId
            },
            relations: ['images']
        })

        return foundApartment;
        
    }
    
    async getApartmentsByUserId(userId: number): Promise<Apartment[]> {
        const foundApartments = await this.apartmentRepository.find({
            where: {
                author: userId
            },
            relations: ['images']
        })

        return foundApartments;
        
    }
    async getFavoriteApartmentsOfUser(userId: number): Promise<Apartment[]> {
        const foundUser = await this.usersRepository.findOne({
            where: {
                id: userId
            },
            relations: ['favoriteApartments']
        })

        const favoriteApartments = [];

         for ( let apartment of foundUser.favoriteApartments) {
            const foundApartment = await this.apartmentRepository.findOne({
                where: {
                    id: apartment.id
                },
                relations: ['images']
            })

            favoriteApartments.push(foundApartment)
        }

        return favoriteApartments;
        
    }

    async addToFavorites(body: any): Promise<any> {

        const apartmentId = body.apartmentId;
        const userId = body.userId;

        const foundApartment = await this.apartmentRepository.findOne({
            where: {
                id: apartmentId
            },
            relations: ['images', 'favoriteOf']
        })
        const foundUser = await this.usersRepository.findOne({
            where: {
                id: userId
            },
        })

        foundApartment.favoriteOf.push(foundUser)
        await this.apartmentRepository.save(foundApartment)

        return foundApartment;
        
    }
}