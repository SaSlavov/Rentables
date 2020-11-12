import { Images } from "src/models/entities/images.entity";
import { User } from "src/models/entities/user.entity";
import { ReturnUserDTO } from "../userDTOs/return-user.dto";

export class ReturnApartmentDTO {
    id: number;
    title: string;
    price: string;
    rooms: string;
    area: string;
    floor: number;
    description: string;
    furnished: string;
    constructionType: string;
    parking: string;
    size: number;
    images: Images;
    author: ReturnUserDTO;
    views: number;
    isRecommended: boolean;
    favoriteOf: ReturnUserDTO[];
}