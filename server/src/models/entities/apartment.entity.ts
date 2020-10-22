import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from "typeorm";

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
}

//     @ManyToOne(
//         () => User,
//         user => user.id
//     )
//     author: User;

//     @ManyToMany(
//         () => User,
//         user => user.id
//     )
//     sharedWith: User[];
// };