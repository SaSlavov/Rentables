import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/models/dtos/userDTOs/create-user.dto';
import { ReturnUserDTO } from 'src/models/dtos/userDTOs/return-user.dto';
import { User } from 'src/models/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { UserRole } from 'src/models/enums/user-role';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
    ) { }
    async getUser(userId: number): Promise<any> {

        const foundUser = await this.usersRepository.findOne({
            where: {
                id: userId,
            },
        });

        return {
            userId: foundUser.id,
            username: foundUser.username,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            phone: foundUser.phone,
        }
    }

    async create(userDto: CreateUserDTO): Promise<ReturnUserDTO> {
        const checkForUserAlreadyExist = await this.usersRepository.findOne({
            where: {
                username: userDto.username,
            },
        });
        if (!checkForUserAlreadyExist) {
            const user = this.usersRepository.create(userDto);
            user.password = await bcrypt.hash(user.password, 10);
            if (userDto.password === 'admin') {
                user.role = UserRole.admin
            }

            const created = await this.usersRepository.save(user);

            return {
                id: created.id,
                username: created.username,
            }
        } else {
            throw new BadRequestException(`User with name ${userDto.username} already exist!`);
        }
    }
    async update(updateInfo: any): Promise<any> {
        const foundUser = await this.usersRepository.findOne({
            where: {
                id: updateInfo.userId,
            },
        });
        
        if (foundUser) {
            foundUser.username = updateInfo.username ? updateInfo.username : foundUser.username
            foundUser.firstName = updateInfo.firstName ? updateInfo.firstName : foundUser.firstName
            foundUser.lastName = updateInfo.lastName ? updateInfo.lastName : foundUser.lastName
            foundUser.phone = updateInfo.phone ? updateInfo.phone.toString() : foundUser.phone

            const updated = await this.usersRepository.save(foundUser);

            return {
                userId: updated.id,
                username: updated.username,
                firstName: updated.firstName,
                lastName: updated.lastName,
                phone: updated.phone,
            }
        } else {
            throw new BadRequestException(`User with name ${updateInfo.username} doesn't exist exist!`);
        }
    }
}
