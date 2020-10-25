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

    // @Column({default: "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg"})
    @OneToOne(
        () => Images,
    )
    @JoinColumn()
    images: Images
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