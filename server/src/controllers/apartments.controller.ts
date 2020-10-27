import { Body, Controller, Get, Param, Post, Query, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
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
  // @UseGuards(BlacklistGuard)
  @UseInterceptors(
    FilesInterceptor('images[]', 10, {
      storage: diskStorage({
        destination: './Apartment_images',
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          //   console.log('filename cb', file);
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
    // @Req() request: any,
  ) {
    const createApartmentDTO = JSON.parse(apartmentInfo.info)
    const authorId = createApartmentDTO.authorId

    return await this.apartmentsService.createApartment(authorId, files, createApartmentDTO);
  };

  @Post('favorite')
  async addToFavorites(
    @Body() data: any,
    // @Req() request: any,
  ) {
    return await this.apartmentsService.addToFavorites(data);
  };


  @Get('favorite/:id')
  async getFavoriteApartmentsOfUser(
    @Param('id') userId: string
  ): Promise<Apartment[]> {

    return await this.apartmentsService.getFavoriteApartmentsOfUser(+userId)
  }
  @Get('filter')
  async searchApartments(
    @Query() query: any
  ): Promise<Apartment[]> {

    return await this.apartmentsService.searchApartments(query)
  }

  @Get('filter/:id')
  async getApartmentById(
    @Param('id') apartmentId: string
  ): Promise<Apartment> {
    return await this.apartmentsService.getApartmentById(+apartmentId)
  }

  @Get('filter/user/:id')
  async getApartmentsByUserId(
    @Param('id') userId: string
  ): Promise<Apartment[]> {

    return await this.apartmentsService.getApartmentsByUserId(+userId)
  }
}
