import { Booking } from "../types/booking.interface";
import { CreateBookingResponse } from "../types/create-booking-response.interface";
import { BookingResponse } from "../types/booking-response.interface";
import { PayBookingResponse } from "../types/pay-booking-response.interface";

export default {
  async create(travelSlug: string, email: string, seats: number): Promise<string> {
    const createBookingInput = {
      createBookingInput: {
        travelSlug: travelSlug,
        email: email,
        seats: seats
      }
    };
    const results: Promise<CreateBookingResponse> = await GqlCreateBooking(createBookingInput)

    return results.createBooking.id
  },

  async pay(booking: Booking): Promise<string> {
    const payBookingInput = {
      payBookingInput: {
        id: booking.id,
        firstName: booking.firstName,
        lastName: booking.lastName,
        email: booking.email,
        phoneNumber: booking.phoneNumber,
        address: booking.address,
        city: booking.city,
        province: booking.province,
        country: booking.country,
        zipCode: booking.zipCode,
        creditCardNumber: booking.creditCardNumber,
        creditCardName: booking.creditCardName,
        expirationMonth: Number(booking.expirationMonth),
        expirationYear: Number(booking.expirationYear),
      }
    };
    const results: Promise<PayBookingResponse> = await GqlPayBooking(payBookingInput)

    return results.payBooking.id
  },

  async find(id: String): Promise<Booking | null> {
      const results: Promise<BookingResponse> = await GqlGetBookingById({ id: id })

      return results.getBookingById
  },

  async delete(id: String) {
      await GqlDeleteBookingById({ id: id })
  },
}
