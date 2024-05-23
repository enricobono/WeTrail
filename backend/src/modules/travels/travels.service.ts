import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { TravelType } from './types/travel.type';


@Injectable()
export class TravelsService {
  constructor(private em: EntityManager) {}

  async findAll() {
    const connection = this.em.getConnection();

    const results = await connection.execute(
      `SELECT t.*, COALESCE(b.sum_of_seats, 0) AS reserved_seats
         FROM travels t
                  LEFT JOIN (SELECT bookings.travel_id, SUM(bookings.seats) AS sum_of_seats
                             FROM bookings
                             WHERE bookings.status = 'paid'
                                OR expired_at > NOW()
                             GROUP BY bookings.travel_id) b
                            ON t.id = b.travel_id
         ORDER BY starting_date ASC`,
    );

    const travels: TravelType[] = [];
    for (const row of results) {
      travels.push({
        id: row.id,
        slug: row.slug,
        name: row.name,
        description: row.description,
        image: row.image,
        startingDate: new Date(row.starting_date),
        endingDate: new Date(row.ending_date),
        price: row.price,
        totalSeats: row.total_seats,
        reservedSeats: row.reserved_seats,
        moodNature: row.mood_nature,
        moodRelax: row.mood_relax,
        moodHistory: row.mood_history,
        moodCulture: row.mood_culture,
        moodParty: row.mood_party,
      } as TravelType);
    }

    return travels;
  }

  async findOneBySlug(slug: string) {
    const results = await this.em.getConnection().execute(
      `SELECT t.*, COALESCE(b.sum_of_seats, 0) as reserved_seats
            FROM travels t
            LEFT JOIN (SELECT bookings.travel_id, SUM(bookings.seats) AS sum_of_seats
                FROM bookings
                WHERE bookings.status = 'paid' or expired_at > NOW()
                GROUP BY bookings.travel_id) b
            ON t.id = b.travel_id 
            WHERE t.slug = '${slug}'
            ORDER BY starting_date ASC
            LIMIT 1`,
    );

    if (results.length === 0) {
      return null;
    }

    return {
      id: results[0].id,
      slug: results[0].slug,
      name: results[0].name,
      description: results[0].description,
      image: results[0].image,
      startingDate: new Date(results[0].starting_date),
      endingDate: new Date(results[0].ending_date),
      price: results[0].price,
      totalSeats: results[0].total_seats,
      reservedSeats: results[0].reserved_seats,
      moodNature: results[0].mood_nature,
      moodRelax: results[0].mood_relax,
      moodHistory: results[0].mood_history,
      moodCulture: results[0].mood_culture,
      moodParty: results[0].mood_party,
    } as TravelType;
  }

  async findOneById(id: string) {
    const results = await this.em.getConnection().execute(
      `SELECT t.*, COALESCE(b.sum_of_seats, 0) as reserved_seats
            FROM travels t
            LEFT JOIN (SELECT bookings.travel_id, SUM(bookings.seats) AS sum_of_seats
                FROM bookings
                WHERE bookings.status = 'paid' or expired_at > NOW()
                GROUP BY bookings.travel_id) b
            ON t.id = b.travel_id 
            WHERE t.id = '${id}'
            ORDER BY starting_date ASC
            LIMIT 1`,
    );

    if (results.length === 0) {
      return null;
    }

    return {
      id: results[0].id,
      slug: results[0].slug,
      name: results[0].name,
      description: results[0].description,
      image: results[0].image,
      startingDate: new Date(results[0].starting_date),
      endingDate: new Date(results[0].ending_date),
      price: results[0].price,
      totalSeats: results[0].total_seats,
      reservedSeats: results[0].reserved_seats,
      moodNature: results[0].mood_nature,
      moodRelax: results[0].mood_relax,
      moodHistory: results[0].mood_history,
      moodCulture: results[0].mood_culture,
      moodParty: results[0].mood_party,
    } as TravelType;
  }
}
