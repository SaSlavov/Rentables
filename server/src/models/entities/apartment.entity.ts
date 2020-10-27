import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, OneToMany, OneToOne, JoinColumn, JoinTable } from "typeorm";
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

    @Column()
    area: string;

    @Column()
    rooms: number;
    @Column()
    floor: number;
    @Column()
    description: string;
    @Column()
    furnished: string;
    @Column()
    constructionType: string;
    @Column()
    parking: string;

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

