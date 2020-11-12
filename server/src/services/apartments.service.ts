import { All, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Apartment } from 'src/models/entities/apartment.entity';
import { User } from 'src/models/entities/user.entity';
import { CreateApartmentDTO } from '../models/dtos/apartmentDTOs/create-apartment.dto'
import { Any, Equal, In, LessThan, MoreThan, Not, Repository, UpdateResult } from 'typeorm';
import { query } from 'express';
import { Images } from 'src/models/entities/images.entity';
import { FavoriteApartmentInfo } from 'src/models/entities/favoriteApartmentInfo.entity';
import { ApartmentImagesAsBLOB } from 'src/models/entities/apartmentImagesAsBLOB.entity';
import { TransformerService } from './transformer.service';
import { ReturnApartmentDTO } from 'src/models/dtos/apartmentDTOs/return-apartment.dto';

@Injectable()
export class ApartmentsService {

    constructor(
        @InjectRepository(Apartment) private readonly apartmentRepository: Repository<Apartment>,
        @InjectRepository(Images) private readonly imagesRepository: Repository<Images>,
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        @InjectRepository(FavoriteApartmentInfo) private readonly favoriteApartmentInfoRepository: Repository<FavoriteApartmentInfo>,
        // @InjectRepository(ApartmentImagesAsBLOB) private readonly apartmentImagesAsBLOBRepository: Repository<ApartmentImagesAsBLOB>,

        private readonly transformerService: TransformerService
    ) { }
    async createApartment(userId, files, CreateApartmentDTO: CreateApartmentDTO): Promise<ReturnApartmentDTO> {
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
        apartment.size = CreateApartmentDTO.size;
        apartment.images = createdImages;
        apartment.author = user;
       
        const createdApartment = await this.apartmentRepository.save(apartment);
        const foundApartment = await this.apartmentRepository.findOne({
            where: {
                id: createdApartment.id
            },
            relations: ['images', 'author', 'favoriteOf']
        })

        return this.transformerService.toReturnApartmentDTO(foundApartment)

    };

    async searchApartments(queryData: any): Promise<ReturnApartmentDTO[]> {
        const area = queryData.area.split('_')
        const rooms = queryData.rooms.split('_')
        const foundApartment = await this.apartmentRepository.find({
            where: {
                area: queryData.area ? In(area): Not(Equal("Not specified")),
                rooms: queryData.rooms ? In(rooms): Not(Equal("Not specified")),
                price: (+queryData.priceMin === 0 && +queryData.priceMax === 0) ? MoreThan(0) : Not(LessThan(queryData.priceMin)) && LessThan(queryData.priceMax),
                furnished: queryData.furnishing ? queryData.furnishing : In(["furnished", "partially furnished", "not furnished", "Not specified"]), 
                constructionType: queryData.construction ? queryData.construction : In(["brick", "panel", "EPK", "Not specified"]),
                parking: queryData.parking ? queryData.parking : In(["no parking", "dedicated spot", "garage", "Not specified"]),
            },
            relations: ['images', 'favoriteOf', 'author']
        })
        return foundApartment.map(apartment => this.transformerService.toReturnApartmentDTO(apartment)) 
        
    }
    async getApartmentById(apartmentId: number): Promise<ReturnApartmentDTO> {
        const foundApartment = await this.apartmentRepository.findOne({
            where: {
                id: apartmentId
            },
            relations: ['images','favoriteOf', 'author']
        })

        return this.transformerService.toReturnApartmentDTO(foundApartment);
        
    }
    
    async getApartmentsByUserId(userId: number): Promise<ReturnApartmentDTO[]> {
        const foundApartments = await this.apartmentRepository.find({
            where: {
                author: userId
            },
            relations: ['images', 'author', 'favoriteOf']
        })

        return foundApartments.map(apartment => this.transformerService.toReturnApartmentDTO(apartment));
        
    }

    async updateApartmentViews(apartmentId: number): Promise<ReturnApartmentDTO> {
        const foundApartment = await this.apartmentRepository.findOne({
            where: {
                id: apartmentId
            },
        })

        foundApartment.views = foundApartment.views + 1
        await this.apartmentRepository.save(foundApartment)

        return this.transformerService.toReturnApartmentDTO(foundApartment);
        
    }
    async getFavoriteApartmentsOfUser(userId: number): Promise<ReturnApartmentDTO[]> {
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
                relations: ['images', 'author', 'favoriteOf']
            })
            const foundInfo = await this.favoriteApartmentInfoRepository.findOne({
                where: {
                    apartment: apartment.id,
                    author: foundUser.id
                },
                 relations: ['author', 'apartment']
            })

            favoriteApartments.push({apartmentInfo: this.transformerService.toReturnApartmentDTO(foundApartment), userInfo:  foundInfo ? foundInfo : {}})
        }

        return favoriteApartments;
        
    }

    async addToFavorites(body: any): Promise<ReturnApartmentDTO> {

        const apartmentId = body.apartmentId;
        const userId = body.userId;

        const foundApartment = await this.apartmentRepository.findOne({
            where: {
                id: apartmentId
            },
            relations: ['images', 'favoriteOf', 'author']
        })
        const foundUser = await this.usersRepository.findOne({
            where: {
                id: userId
            },
        })
        const favoriteOf = foundApartment.favoriteOf.map(user => user.id)
        if(favoriteOf.includes(foundUser.id)) {
            foundApartment.favoriteOf = foundApartment.favoriteOf.filter(user => user.id !== foundUser.id)
        } else {
            foundApartment.favoriteOf.push(foundUser)
        }
        await this.apartmentRepository.save(foundApartment)

        return this.transformerService.toReturnApartmentDTO(foundApartment);
        
    }
    async addToRecommended(apartmentId: number): Promise<ReturnApartmentDTO> {

        const foundApartment = await this.apartmentRepository.findOne({
            where: {
                id: apartmentId
            },
        })
       
        foundApartment.isRecommended = !foundApartment.isRecommended

        await this.apartmentRepository.save(foundApartment)

        return this.transformerService.toReturnApartmentDTO(foundApartment);
        
    }

    async getRecommended(): Promise<ReturnApartmentDTO[] | string> {
        const foundApartment = await this.apartmentRepository.find({
            where: {
                isRecommended: true
            },
            relations: ['images']
        })
       
       return foundApartment ? foundApartment.map(apartment => this.transformerService.toReturnApartmentDTO(apartment)) : 'Didn\'t find any recommended apartments!'
        
    }

   
    async addInfoToFavoriteApartment(body: any): Promise<UpdateResult | FavoriteApartmentInfo> {
        const apartmentId = body.apartmentId;
        const userId = body.userId;
        const infoId = body.id

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

        if(infoId) {       
           const updated = await this.favoriteApartmentInfoRepository.update(infoId, {
                comment: body.comment,
                date: body.date,
                time: body.time,
                street: body.street,
            })

            return updated;
        }

        const newInfo = new FavoriteApartmentInfo;

        newInfo.comment = body.comment;
        newInfo.date = body.date;
        newInfo.time = body.time;
        newInfo.street = body.street;
        newInfo.author = foundUser;
        newInfo.apartment = foundApartment;

        const createdInfo = await this.favoriteApartmentInfoRepository.save(newInfo);
        
        return createdInfo
        
    }

     // async addImageAsBlob(body: any): Promise<any> {
    //     console.log(body)

    //     const apartmentId = body.apartmentId;
    //     // const userId = body.userId;

    //     const foundApartment = await this.apartmentRepository.findOne({
    //         where: {
    //             id: apartmentId
    //         },
    //         relations: ['images', 'favoriteOf', 'imageBlob']
    //     })

    //     const image = new ApartmentImagesAsBLOB;
    //     image.image = body.blob
    //     const savedImage = await this.apartmentImagesAsBLOBRepository.save(image)
       
    //     foundApartment.imageBlob.push(savedImage)
    //     // console.log(foundApartment.favoriteOf, foundUser)
        
    //     await this.apartmentRepository.save(foundApartment)

    //     return foundApartment;
        
    // }
}
