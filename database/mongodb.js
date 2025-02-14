import mongoose from "mongoose";

import {DB_URI, NODE_ENV} from "../config/env.js";

// Explicitly import process in ESM
import process from 'node:process';

if(!DB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env<deveopment/production>.local");
}

// connect to database 
const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`MongoDB Connected: ${NODE_ENV}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export default connectDB;