import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/models/dtos/userDTOs/create-user.dto';
import { ReturnUserDTO } from 'src/models/dtos/userDTOs/return-user.dto';
import { User } from 'src/models/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
    ) { }


    async create(userDto: CreateUserDTO): Promise<ReturnUserDTO> {
        const checkForUserAlreadyExist = await this.usersRepository.findOne({
            where: {
                username: userDto.username,
            },
        });
        if (!checkForUserAlreadyExist) {
            const user = this.usersRepository.create(userDto);
            user.password = await bcrypt.hash(user.password, 10);

            const created = await this.usersRepository.save(user);

            // return this.transformService.toReturnUserDTO(created);
            return {
                id: created.id,
                username: created.username,
            }
        } else {
            throw new BadRequestException(`User with name ${userDto.username} already exist!`);
        }
    }
}
