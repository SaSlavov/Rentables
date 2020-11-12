import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, JoinTable, PrimaryColumn, ManyToOne } from "typeorm";
import { Apartment } from "./apartment.entity";
import { User } from "./user.entity";

@Entity()
export class FavoriteApartmentInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    comment: string;

    @Column()
    date: string;

    @Column()
    time: string;

    @Column()
    street: string;

    @ManyToOne(
        () => User,
        user => user.id
    )
    author: User;

    @ManyToOne(
        () => Apartment,
        apartment => apartment.id
    )
    apartment: Apartment;


}