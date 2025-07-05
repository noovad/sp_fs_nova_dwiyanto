import { config } from 'dotenv';

config();

export const { DATABASE_URL, JWT_SECRET, JWT_EXPIRES_IN } = process.env;