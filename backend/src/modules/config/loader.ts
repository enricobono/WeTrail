import * as path from 'path';
import { configDotenv } from 'dotenv';
import { EnvTarget } from './types/env-target.enum';
import { EnvSchema } from './types/env-schema.interface';

const envFilePath = path.resolve('.env');
const { error, parsed } = configDotenv({ path: envFilePath });

if (error) {
  throw new Error('Error while parsing env file');
}

const env: EnvSchema = {
  target: EnvTarget[parsed?.ENV_TARGET],
  app: {
    port: +parsed?.APP_PORT
  },
  database: {
    host: parsed?.DATABASE_HOST,
    port: +parsed?.DATABASE_PORT,
    username: parsed?.DATABASE_USERNAME,
    password: parsed?.DATABASE_PASSWORD,
    name: parsed?.DATABASE_NAME,
  },
};

export const getEnvVariables = (): EnvSchema => ({
  ...env,
});
