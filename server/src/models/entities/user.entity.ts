import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { UserRole } from "../enums/user-role";
import { Apartment } from "./apartment.entity";
import { FavoriteApartmentInfo } from "./favoriteApartmentInfo.entity";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;
    @Column()
    password: string;
    @Column({ type: 'enum', enum: UserRole, default: UserRole.guest })
    role: UserRole;

    @Column({ nullable: true })
    firstName: string;
    @Column({ nullable: true })
    lastName: string;
    @Column({ nullable: true })
    banEndDate: Date;
    @Column({ nullable: true })
    avatarUrl: string;
    @Column({ default: false })
    isDeleted: boolean;
    @Column({default: 'Not Specified'})
    phone: string;
    
    @OneToMany(
        () => Apartment,
        apartment => apartment.author
    )
    apartments: Apartment[]
    
    @ManyToMany(
        () => Apartment,
        apartment => apartment.favoriteOf
    )
    favoriteApartments: Apartment[];   
    
}