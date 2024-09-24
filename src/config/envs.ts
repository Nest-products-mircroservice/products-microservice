import 'dotenv/config';
import * as joi from 'joi';
import { IEnvVarsInterface } from 'src/interfaces/env-vars.interface';

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS.split(','),
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envsVars: IEnvVarsInterface = value;

export const envs = { port: envsVars.PORT, databaseUrl: envsVars.DATABASE_URL, natsServers: envsVars.NATS_SERVERS };
