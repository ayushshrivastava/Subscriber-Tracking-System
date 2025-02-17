import express from 'express'
import { PORT } from './config/env.js';

import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';  
import authRouter from './routes/auth.routes.js';
import connectDB from './database/mongodb.js';
// import { error } from 'node:console';
import errormiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';
import workflowRouter from './routes/workflow.routes.js';



const app = express();

//built-in middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware)


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/workflows', workflowRouter);

app.use(errormiddleware);


app.get('/', (req, res) => {
    res.send('Welcome to the Subscription Tracker API')
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

await connectDB();

export default app;