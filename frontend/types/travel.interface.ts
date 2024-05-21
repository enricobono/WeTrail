export interface Travel {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  startingDate: Date
  endingDate: Date
  price: number
  totalSeats: number
  reservedSeats: number
  moodNature: number
  moodRelax: number
  moodHistory: number
  moodCulture: number
  moodParty: number
}
