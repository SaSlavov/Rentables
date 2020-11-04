import { Controller, Get, Param } from '@nestjs/common';
import { FavoriteApartmentInfo } from 'src/models/entities/favoriteApartmentInfo.entity';
import { FavoriteInfoService } from 'src/services/favorite-info.service';

@Controller('favorite-info')
export class FavoriteInfoController {
    constructor(
        private readonly favoriteInfoService: FavoriteInfoService,
      ) { }

    @Get(':id')
    async getInfoOfFavoriteApartmentsOfUser(
        @Param('id') userId: string
    ): Promise<FavoriteApartmentInfo[]> {
        return await this.favoriteInfoService.getInfoOfFavoriteApartmentsOfUser(+userId)
    }
}
