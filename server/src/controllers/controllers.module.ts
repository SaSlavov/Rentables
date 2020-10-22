import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services/services.module';
import { ApartmentsController } from './apartments.controller';

@Module({
    imports: [ServicesModule],
    controllers: [ApartmentsController]
})
export class ControllersModule {}
