import BookingApi from "../api/BookingApi";

export const useBookingStore = defineStore('bookingStore', {
  state: () => ({
    bookingId: '',
  }),
  actions: {
    async book(travelSlug: string, email: string, seats: number) {
      this.getBookingId().then((bookingId: string) => {
        this.delete(bookingId)
      }).catch(() => {
      })

      await BookingApi.create(travelSlug, email, seats).then((results) => {
        this.bookingId = results
        localStorage.setItem('booking-id', this.bookingId)
      })
    },

    async delete(bookingId: string) {
      if (bookingId === null) {
        return
      }

      await BookingApi.delete(bookingId).then(() => {
        localStorage.removeItem('booking-id')
      }).catch(() => {})
    },

    async getBookingId(): Promise<string | null> {
      this.bookingId = localStorage.getItem('booking-id')

      if (this.bookingId === null) {
        throw new Error()
      }

      return this.bookingId
    },
  }
})