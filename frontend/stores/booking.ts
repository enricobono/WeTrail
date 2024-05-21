import BookingRepository from "../repositories/BookingRepository";

export const useBookingStore = defineStore('bookingStore', {
  state: () => ({
    id: '',
    travelSlug: '',

  }),
  actions: {
    async book(travelSlug: string, seats: number) {
      console.log('useBookingStore.book() travelSlug:' + travelSlug);

      this.getBookingId().then((bookingId: string | null) => {
        this.delete(bookingId)
      })

      await BookingRepository.create(travelSlug, seats).then((results) => {
        console.log('dentro il then');

        this.id = results
        this.travelSlug = travelSlug
        localStorage.setItem('booking-id', this.id)
      })
    },
    async delete(bookingId: string) {
      if (bookingId === null) {
        return
      }

      await BookingRepository.delete(bookingId).then(() => {
        localStorage.removeItem('booking-id')
      })
    },
    async getBookingId(): Promise<string | null> {
      this.id = localStorage.getItem('booking-id')

      if (this.id === 'null') {
        return null
      }

      return this.id
    },
  }
})