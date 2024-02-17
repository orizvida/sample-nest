export const POSTGRES_HOST = 'POSTGRES_HOST';
export const POSTGRES_PORT = 'POSTGRES_PORT';
export const POSTGRES_USER = 'POSTGRES_USER';
export const POSTGRES_PASSWORD = 'POSTGRES_PASSWORD';
export const POSTGRES_DB = 'POSTGRES_DB';
export const API_V1_STR = 'API_V1_STR';
export const API_V1_DOCS_STR = 'API_V1_DOCS_STR';

export default () => ({
  [POSTGRES_HOST]: process.env.POSTGRES_HOST,
  [POSTGRES_PORT]: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  [POSTGRES_USER]: process.env.POSTGRES_USER,
  [POSTGRES_PASSWORD]: process.env.POSTGRES_PASSWORD,
  [POSTGRES_DB]: process.env.POSTGRES_DB,
  API_V1_STR: '/api/v1',
  API_V1_DOCS_STR: '/api/v1/docs',
});
