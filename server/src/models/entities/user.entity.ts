import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { UserRole } from "../enums/user-role";


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
    
    // @ManyToMany(
    //     () => ChatRoom,
    //     room => room.participants
    // )
    // chatRooms: ChatRoom[];
    

//     @ManyToMany(
//         () => Board,
//         board => board.id
//     )
//     @JoinTable()
//     boardsInvitations: Board[];
// };
}