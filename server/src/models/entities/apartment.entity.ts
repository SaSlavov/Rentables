import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, OneToMany, OneToOne, JoinColumn, JoinTable } from "typeorm";
import { ApartmentImagesAsBLOB } from "./apartmentImagesAsBLOB.entity";
import { Images } from "./images.entity";
import { User } from "./user.entity";

@Entity()
export class Apartment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    price: string;

    @Column({default: 'Not specified'})
    area: string;

    @Column()
    rooms: string;
    @Column()
    floor: number;
    @Column()
    description: string;
    @Column({default: 'Not specified'})
    furnished: string;
    @Column({default: 'Not specified'})
    constructionType: string;
    @Column({default: 'Not specified'})
    parking: string;
    @Column({default: 0})
    views: number;
    @Column({default: false})
    isRecommended: boolean;

    @Column({default: 0})
    size: number;

    // @ManyToMany(
    //     () => ApartmentImagesAsBLOB,
    //     image => image.image,
        
    // )
    // @JoinTable()
    
    // imageBlob: any[];
    

    @OneToOne(
        () => Images,
    )
    @JoinColumn()
    images: Images
    @ManyToOne(
        () => User,
        user => user.apartments
    )
    author: User;
    @ManyToMany(
        () => User,
        user => user.favoriteApartments
    )
    @JoinTable()
    favoriteOf: User[];

}

