import * as Common from '@voiceflow/common';

import { Config } from './types';

const { getProcessEnv, hasProcessEnv } = Common.utils.general;

const optionalProcessEnv = (name: keyof Config) => (hasProcessEnv(name) ? getProcessEnv(name) : null);

const CONFIG: Config = {
  NODE_ENV: getProcessEnv('NODE_ENV'),
  PORT: getProcessEnv('PORT'),

  AWS_ACCESS_KEY_ID: optionalProcessEnv('AWS_ACCESS_KEY_ID'),
  AWS_SECRET_ACCESS_KEY: optionalProcessEnv('AWS_SECRET_ACCESS_KEY'),
  AWS_REGION: optionalProcessEnv('AWS_REGION'),
  AWS_ENDPOINT: optionalProcessEnv('AWS_ENDPOINT'),

  DYNAMO_ENDPOINT: optionalProcessEnv('DYNAMO_ENDPOINT'),

  // Secrets configuration
  SECRETS_PROVIDER: getProcessEnv('SECRETS_PROVIDER'),
  API_KEYS_SECRET: optionalProcessEnv('API_KEYS_SECRET'),
  MAIN_DB_SECRET: optionalProcessEnv('MAIN_DB_SECRET'),

  // Release information
  GIT_SHA: optionalProcessEnv('GIT_SHA'),
  BUILD_NUM: optionalProcessEnv('BUILD_NUM'),
  SEM_VER: optionalProcessEnv('SEM_VER'),
  BUILD_URL: optionalProcessEnv('BUILD_URL'),
};

export default CONFIG;
