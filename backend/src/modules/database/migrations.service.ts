import { MikroORM } from '@mikro-orm/core';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MigrationsService {
  private logger: Logger;

  constructor(private orm: MikroORM) {
    this.logger = new Logger(MigrationsService.name);
    this.migrate();
  }

  private async migrate() {
    const { migrator } = this.orm;

    try {
      const migrations = await migrator.getPendingMigrations();
      if (migrations.length === 0) {
        return
      }

      await migrator.up();
    } catch (error) {
      this.logger.error('Error while migrating the database', error);
    }
  }
}
