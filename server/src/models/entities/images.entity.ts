import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, OneToOne } from "typeorm";
import { Apartment } from "./apartment.entity";

@Entity()
export class Images {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 600, type: 'nvarchar'})
    images: string;

    // @OneToOne(
    //     () => Apartment,
    //     apartment => apartment.id
    // )
    // apartment: Apartment;
}