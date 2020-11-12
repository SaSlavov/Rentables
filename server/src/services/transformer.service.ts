import { Injectable } from '@nestjs/common';
import { ReturnApartmentDTO } from 'src/models/dtos/apartmentDTOs/return-apartment.dto';
import { ReturnUserDTO } from 'src/models/dtos/userDTOs/return-user.dto';
import { Apartment } from 'src/models/entities/apartment.entity';
import { User } from 'src/models/entities/user.entity';

@Injectable()
export class TransformerService {
    public toReturnApartmentDTO(apartment: Apartment): ReturnApartmentDTO {
        return {
            id: apartment.id,
            title: apartment.title,
            price: apartment.price,
            rooms: apartment.rooms,
            area: apartment.area,
            floor: apartment.floor,
            description: apartment.description,
            furnished: apartment.furnished,
            constructionType: apartment.constructionType,
            parking: apartment.parking,
            size: apartment.size,
            images: apartment.images,
            author: this.toReturnUserDTO(apartment.author),
            views: apartment.views,
            isRecommended: apartment.isRecommended,
            favoriteOf: apartment.favoriteOf && apartment.favoriteOf.map(user => this.toReturnUserDTO(user)),
        }
    }

    public toReturnUserDTO(user: User): ReturnUserDTO {
        if (user) {
            return {
                id: user.id,
                username: user.username,
            }
        } else {
            return
        }
    }

}
