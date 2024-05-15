import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Travel } from './entities/travel.entity';
import { TravelsService } from './travels.service';
import { TravelsResolver } from './travels.resolver';

@Module({
  imports: [
    MikroOrmModule.forFeature([Travel]),
  ],
  providers: [TravelsResolver, TravelsService],
  exports: [TravelsService],
})
export class TravelsModule {}
