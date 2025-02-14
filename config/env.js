import { config } from 'dotenv';

// Explicitly import process in ESM
import process from 'node:process';

config({path: `.env.${process.env.NODE_ENV || 'development'}.local`});

export const {PORT, NODE_ENV, DB_URI} = process.env;