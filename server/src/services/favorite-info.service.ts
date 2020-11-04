import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteApartmentInfo } from 'src/models/entities/favoriteApartmentInfo.entity';
import { User } from 'src/models/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoriteInfoService {
    constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        @InjectRepository(FavoriteApartmentInfo) private readonly favoriteApartmentInfoRepository: Repository<FavoriteApartmentInfo>,
    ) { }

    async getInfoOfFavoriteApartmentsOfUser(userId: number): Promise<FavoriteApartmentInfo[]> {

        const foundInfo = await this.favoriteApartmentInfoRepository.find({
            where: {
                author: userId
            },
            relations: ['apartment']
        })

        return foundInfo
    }
}
