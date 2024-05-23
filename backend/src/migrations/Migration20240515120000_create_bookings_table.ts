import { Migration } from '@mikro-orm/migrations';

export class Migration20240515120000_create_bookings_table extends Migration {
  async up(): Promise<void> {
    this.addSql("CREATE TYPE status as ENUM('reserved', 'paid');");
    this.addSql(
      'CREATE TABLE "bookings" ("id" UUID NOT NULL,' +
        ' "travel_id" uuid NOT NULL,' +
        ' "status" status,' +
        ' "seats" smallint NOT NULL,' +
        ' "grand_total" int NOT NULL,' +
        ' "first_name" varchar(255) NULL,' +
        ' "last_name" varchar(255) NULL,' +
        ' "email" varchar(255) NULL,' +
        ' "phone_number" varchar(255) NULL,' +
        ' "address" varchar(255) NULL,' +
        ' "city" varchar(255) NULL,' +
        ' "province" varchar(255) NULL,' +
        ' "country" varchar(255) NULL,' +
        ' "zip_code" varchar(255) NULL,' +
        ' "payment_processor" varchar(255) NULL,' +
        ' "payment_id" varchar(255) NULL,' +
        ' "created_at" timestamp with time zone NOT NULL,' +
        ' "expired_at" timestamp with time zone NOT NULL,' +
        ' "updated_at" timestamp with time zone NOT NULL,' +
        ' CONSTRAINT "bookings_pkey" PRIMARY KEY ("id"));',
    );

    this.addSql(
      'ALTER TABLE "bookings" ADD CONSTRAINT "bookings_travel_id_foreign" FOREIGN KEY ("travel_id") REFERENCES "travels" ("id") ON UPDATE CASCADE ON DELETE CASCADE;',
    );
  }

  async down(): Promise<void> {
    this.addSql('DROP TABLE IF EXISTS "bookings" CASCADE;');
    this.addSql('DROP TYPE status;');
  }
}
