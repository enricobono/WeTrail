import { Migration } from '@mikro-orm/migrations';

export class Migration20240521100000_seed_travels_table extends Migration {

  async up(): Promise<void> {
    this.addSql("INSERT INTO travels (id, slug, name, description, image, starting_date, ending_date, price, total_seats, reserved_seats, mood_nature, mood_relax, mood_history, mood_culture, mood_party) VALUES ('d408be33-aa6a-4c73-a2c8-58a70ab2ba4d', 'jordan-360', 'Jordan 360°', 'Jordan 360°: the perfect tour to discover the suggestive Wadi Rum desert', '/images/travels/jordan-360.jpg', '2024-06-01', '2024-06-09', 199900, 5, 2, 80, 20, 90, 30, 10);");

    this.addSql("INSERT INTO travels (id, slug, name, description, image, starting_date, ending_date, price, total_seats, reserved_seats, mood_nature, mood_relax, mood_history, mood_culture, mood_party) VALUES ('4f4bd032-e7d4-402a-bdf6-aaf6be240d53', 'iceland-hunting-northern-lights', 'Iceland: hunting for the Northern Lights', 'Why visit Iceland in winter? Because it is between October and March that this land offers the spectacle of the Northern Lights', '/images/travels/iceland-hunting-northern-lights.jpg', '2024-06-01', '2024-06-08', 199900, 5, 0, 100, 30, 10, 20, 10);");

    this.addSql("INSERT INTO travels (id, slug, name, description, image, starting_date, ending_date, price, total_seats, reserved_seats, mood_nature, mood_relax, mood_history, mood_culture, mood_party) VALUES ('cbf304ae-a335-43fa-9e56-811612dcb601', 'united-arab-emirates', 'United Arab Emirates: from Dubai to Abu Dhabi', 'At Dubai and Abu Dhabi everything is huge and majestic: here futuristic engineering works and modern infrastructures meet historical districts', '/images/travels/united-arab-emirates.jpg', '2024-06-03', '2024-06-10', 149900, 5, 0, 30, 40, 20, 80, 70);");
  }

  async down(): Promise<void> {
  }
}
