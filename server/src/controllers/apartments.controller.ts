import { Body, Controller, Get, Post, Query, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
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
            destination: './Apartment images',
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
        // console.log(files)
        return await this.apartmentsService.createApartment(1, files, createApartmentDTO);
    };

    @Get('filter')
    async searchApartments(
        @Query() query: any
    ) { //: Promise<Apartment[]>

        return await this.apartmentsService.searchApartments(query)
    }
}
