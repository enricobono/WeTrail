import { Migration } from '@mikro-orm/migrations';

export class Migration20240515120000_create_bookings_table extends Migration {

  async up(): Promise<void> {
    this.addSql('CREATE TABLE "bookings" ("id" UUID NOT NULL,' +
      ' "travel_id" uuid NOT NULL,' +
      ' "pax" smallint NOT NULL,' +
      ' "status" varchar(255) NOT NULL,' +
      ' "first_name" varchar(255) NOT NULL,' +
      ' "last_name" varchar(255) NOT NULL,' +
      ' "email" varchar(255) NOT NULL,' +
      ' "phone_number" varchar(255) NOT NULL,' +
      ' "address_1" varchar(255) NOT NULL,' +
      ' "address_2" varchar(255) NOT NULL,' +
      ' "city" varchar(255) NOT NULL,' +
      ' "province" varchar(255) NOT NULL,' +
      ' "country" varchar(255) NOT NULL,' +
      ' "zip_code" varchar(255) NOT NULL,' +
      ' "payment_processor" varchar(255) NULL,' +
      ' "payment_id" varchar(255) NULL,' +
      ' CONSTRAINT "bookings_pkey" PRIMARY KEY ("id"));');

    this.addSql('ALTER TABLE "bookings" ADD CONSTRAINT "bookings_travel_id_foreign" FOREIGN KEY ("travel_id") REFERENCES "travels" ("id") ON UPDATE CASCADE ON DELETE CASCADE;');
  }

  async down(): Promise<void> {
    this.addSql('DROP TABLE IF EXISTS "bookings" CASCADE;');
  }

}
