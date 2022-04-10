import {getEnvironmentVariable} from "application-common-components";
import {Environment, STAGE} from "@common/contracts";
import dotenv from 'dotenv';

export const createEnvironment = ():Environment => {
  const stage = getEnvironmentVariable<STAGE>('STAGE');

  const envFilename = `.env.${stage}`;

  const {parsed, error} = dotenv.config({path: envFilename}) ;
  if (error)
    throw error;

  if (!parsed)
    throw new Error(`createEnvironment failed, dotenv parsing .env.\${process.env.STAGE||'dev'}=${envFilename} returned undefined`);

  return parsed as Environment
}