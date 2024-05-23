export interface BookingResponse {
  getBookingById: {
    id: string;
    travelId: string;
    seats: number;
    status: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    city: string;
    province: string;
    country: string;
    zipCode: string;
    paymentProcessor: string;
    paymentId: string;
  }
}