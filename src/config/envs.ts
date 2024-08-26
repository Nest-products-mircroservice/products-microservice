import 'dotenv/config';
import Joi from 'joi';
import { IEnvVarsInterface } from 'src/interfaces/env-vars.interface';

const envsSchema = Joi.object({
  PORT: Joi.number().required(),
}).unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envsVars: IEnvVarsInterface = value;

export const envs = { port: envsVars.PORT };
