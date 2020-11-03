import { Body, Controller, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { CreateUserDTO } from 'src/models/dtos/userDTOs/create-user.dto';
import { ReturnUserDTO } from 'src/models/dtos/userDTOs/return-user.dto';
import { UsersService } from 'src/services/users.service';

@Controller('users')
export class UsersController {

    constructor(
        private readonly userService: UsersService,
      ) { }

    @Get('/:id')
    async getUser(
        @Param('id') id: string
    ): Promise<ReturnUserDTO> {
        return await this.userService.getUser(+id);
    }
    @Post()
    async createUser(
        @Body(new ValidationPipe({ whitelist: false })) newUser: CreateUserDTO
    ): Promise<ReturnUserDTO> {
        return await this.userService.create(newUser);
    }

    @Put()
    async updateUser(
        @Body() updateInfo: any
    ): Promise<ReturnUserDTO> {
        return await this.userService.update(updateInfo);
    }

}
