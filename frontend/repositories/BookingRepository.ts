import { Booking } from "../types/booking.interface";
import { CreateBookingResponse } from "../types/create-booking-response.interface";
import { BookingResponse } from "../types/booking-response.interface";

export default {
  async create(travelSlug: string, seats: number): Promise<string>/*: Promise<Travel[]>*/ {
    console.log('BookingRepository.create()');

    try {
      const createBookingInput = {
        createBookingInput: {
          travelSlug: travelSlug,
          seats: seats
        }
      };
      const results: Promise<CreateBookingResponse> = await GqlCreateBooking(createBookingInput)

      return results.createBooking.id
    } catch (error) {
      // console.error(error)
    }
  },

  async find(id: String): Promise<Booking|null> {
    try {
      const results: Promise<BookingResponse> = await GqlGetBookingById({ id: id })

      return results.getBookingById
    } catch (error) {
      return null
    }
  },

  async delete(id: String): Promise<Booking|null> {
    try {
      await GqlDeleteBookingById({ id: id })
    } catch (error) {
      return null
    }
  },
}
