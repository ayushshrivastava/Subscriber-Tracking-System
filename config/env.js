import { config } from 'dotenv';

// Explicitly import process in ESM
import process from 'node:process';

config({path: `.env.${process.env.NODE_ENV || 'development'}.local`});

export const {
    PORT, NODE_ENV,
     DB_URI,
     JWT_SECRET,JWT_EXPIRES_IN,
     ARCJET_ENV,ARCJET_KEY,
     SERVER_URL,
     QSTASH_URL,QSTASH_TOKEN,
     QSTASH_CURRENT_SIGNING_KEY,
     QSTASH_NEXT_SIGNING_KEY,
     EMAIL_PASSWORD,
} = process.env;