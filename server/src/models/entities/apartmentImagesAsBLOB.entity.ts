import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Apartment } from "./apartment.entity";

@Entity()
export class ApartmentImagesAsBLOB {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(
        () => Apartment,
        apartment => apartment.imageBlob

    )
    @Column({type: 'varbinary'})
    image: any[]


}