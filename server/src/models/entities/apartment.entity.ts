import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Images } from "./images.entity";

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
}

