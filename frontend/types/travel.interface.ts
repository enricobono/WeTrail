export interface Travel {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  startingDate: Date
  endingDate: Date
  price: number
  totalPax: number
  reservedPax: number
  mood_nature: number
  mood_relax: number
  mood_history: number
  mood_culture: number
  mood_party: number
}
