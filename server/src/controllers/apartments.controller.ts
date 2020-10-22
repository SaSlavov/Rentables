import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { BlacklistGuard } from 'src/auth/blacklist.guard';
import { CreateApartmentDTO } from 'src/models/dtos/apartmentDTOs/create-apartment.dto';
import { Apartment } from 'src/models/entities/apartment.entity';
import { ApartmentsService } from 'src/services/apartments.service';

@Controller('apartments')
export class ApartmentsController {
    constructor(
        private readonly apartmentsService: ApartmentsService,
    ) { }

    @Post()
    @UseGuards(BlacklistGuard)
    async createApartment(
        @Body() CreateApartmentDTO: CreateApartmentDTO,
        // @Req() request: any,
    ): Promise<Apartment> {

        return await this.apartmentsService.createApartment(1, CreateApartmentDTO);
    };
}
