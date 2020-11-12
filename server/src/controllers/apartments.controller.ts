import { Body, Controller, Get, Param, Post, Put, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import {  FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { BlacklistGuard } from 'src/auth/blacklist.guard';
import { RolesGuard } from 'src/auth/roles-guard';
import { ReturnApartmentDTO } from 'src/models/dtos/apartmentDTOs/return-apartment.dto';
import { Apartment } from 'src/models/entities/apartment.entity';
import { FavoriteApartmentInfo } from 'src/models/entities/favoriteApartmentInfo.entity';
import { UserRole } from 'src/models/enums/user-role';
import { ApartmentsService } from 'src/services/apartments.service';
import { UpdateResult } from 'typeorm';

@Controller('apartments')
export class ApartmentsController {
  constructor(
    private readonly apartmentsService: ApartmentsService,
  ) { }

  @Post()
  // @UseGuards(BlacklistGuard)
  @UseInterceptors(
    FilesInterceptor('images[]', 10, {
      storage: diskStorage({
        destination: './Apartment_images',
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  //   @ApiConsumes ('multipart/form-data')
  async createApartment(
    @UploadedFiles() files,
    @Body() apartmentInfo: any,
  ): Promise<ReturnApartmentDTO> {

    const createApartmentDTO = JSON.parse(apartmentInfo.info)
    const authorId = createApartmentDTO.authorId

    return await this.apartmentsService.createApartment(authorId, files, createApartmentDTO);
  };

  @Post('favorite')
  async addToFavorites(
    @Body() data: any,
  ): Promise<ReturnApartmentDTO> {

    return await this.apartmentsService.addToFavorites(data);
  };

  @Get('recommend')
  async getRecommended(
  ): Promise<ReturnApartmentDTO[] | string> {

    return await this.apartmentsService.getRecommended();
  };


  @Put('recommend/:id')
  @UseGuards(BlacklistGuard, new RolesGuard(UserRole.admin))
  async addToRecommended(
    @Param('id') apartmentId: string
  ): Promise<ReturnApartmentDTO> {

    return await this.apartmentsService.addToRecommended(+apartmentId);
  };

  @Post('favorite/info')
  async addInfoToFavoriteApartment(
    @Body() data: any,
  ): Promise<UpdateResult | FavoriteApartmentInfo> {

    return await this.apartmentsService.addInfoToFavoriteApartment(data);
  };

  @Put(':id')
  async updateApartmentViews(
    @Param('id') apartmentId: string
  ): Promise<ReturnApartmentDTO> {

    return await this.apartmentsService.updateApartmentViews(+apartmentId);
  };


  @Get('favorite/:id')
  async getFavoriteApartmentsOfUser(
    @Param('id') userId: string
  ): Promise<ReturnApartmentDTO[]> {

    return await this.apartmentsService.getFavoriteApartmentsOfUser(+userId)
  }
  @Get('filter')
  async searchApartments(
    @Query() query: any
  ): Promise<ReturnApartmentDTO[]> {

    return await this.apartmentsService.searchApartments(query)
  }

  @Get('filter/:id')
  async getApartmentById(
    @Param('id') apartmentId: string
  ): Promise<ReturnApartmentDTO> {

    return await this.apartmentsService.getApartmentById(+apartmentId)
  }

  @Get('filter/user/:id')
  async getApartmentsByUserId(
    @Param('id') userId: string
  ): Promise<ReturnApartmentDTO[]> {

    return await this.apartmentsService.getApartmentsByUserId(+userId)
  }

  // @Post('imageBlob')
  // async addImageAsBlob(
  //   @Body() data: any,
  //   // @Req() request: any,
  // ) {
  //   return await this.apartmentsService.addImageAsBlob(data);
  // };
}
