import { Module, forwardRef } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TravelsModule } from '../travels/travels.module';
import { BookingsService } from './bookings.service';
import { BookingsResolver } from './bookings.resolver';
import { Booking } from './entities/booking.entity';

@Module({
  imports: [
    forwardRef(() => TravelsModule),
    MikroOrmModule.forFeature([Booking])
  ],
  providers: [BookingsResolver, BookingsService],
  exports: [BookingsService],
})
export class BookingsModule {}
