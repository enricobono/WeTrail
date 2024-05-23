import { Migration } from '@mikro-orm/migrations';

export class Migration20240515110000_create_travels_table extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'CREATE TABLE "travels" ("id" UUID NOT NULL,' +
        ' "slug" varchar(255) NOT NULL,' +
        ' "name" varchar(255) NOT NULL,' +
        ' "description" text NOT NULL,' +
        ' "image" varchar(255) NOT NULL,' +
        ' "starting_date" date NOT NULL,' +
        ' "ending_date" date NOT NULL,' +
        ' "price" int NOT NULL,' +
        ' "total_seats" smallint NOT NULL DEFAULT 5,' +
        ' "mood_nature" smallint NOT NULL DEFAULT 0,' +
        ' "mood_relax" smallint NOT NULL DEFAULT 0,' +
        ' "mood_history" smallint NOT NULL DEFAULT 0,' +
        ' "mood_culture" smallint NOT NULL DEFAULT 0,' +
        ' "mood_party" smallint NOT NULL DEFAULT 0,' +
        ' CONSTRAINT "travels_pkey" PRIMARY KEY ("id"));',
    );

    this.addSql(
      'ALTER TABLE "travels" ADD CONSTRAINT "travels_slug_unique" UNIQUE ("name");',
    );
    this.addSql(
      'ALTER TABLE "travels" ADD CONSTRAINT "travels_name_unique" UNIQUE ("name");',
    );
    this.addSql('CREATE INDEX travels_slug_id_index ON travels (slug);');
  }

  async down(): Promise<void> {
    this.addSql('DROP TABLE IF EXISTS "travels" CASCADE;');
  }
}
