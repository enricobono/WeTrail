import { Booking } from "../types/booking.interface";
import { CreateBookingResponse } from "../types/create-booking-response.interface";
import { BookingResponse } from "../types/booking-response.interface";
import { PayBookingResponse } from "../types/pay-booking-response.interface";

export default {
  async create(travelSlug: string, seats: number): Promise<string> {
    console.log('BookingApi.create()');

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

  async pay(booking: Booking): Promise<string> {
    console.log('BookingApi.pay()');

    try {
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
    } catch (error) {
      throw new Error(error)
    }
  },

  async find(id: String): Promise<Booking | null> {
    try {
      const results: Promise<BookingResponse> = await GqlGetBookingById({ id: id })

      return results.getBookingById
    } catch (error) {
      return null
    }
  },

  async delete(id: String): Promise<Booking | null> {
    try {
      await GqlDeleteBookingById({ id: id })
    } catch (error) {
      return null
    }
  },
}
