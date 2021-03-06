import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './swagger/swagger';
import api from './api';
import firebase from 'firebase/app';
import 'firebase/database';
import { getUsersFromSchedule } from './services/scheduleReader';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
};

firebase.initializeApp(config);

export const db = firebase.database();

const app = express();

const port = 8080; // default port to listen
app.use('/api/v1', api);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen( port, () => {
    getUsersFromSchedule()
    console.log(process.env.FIREBASE_KEY)
    console.log( `server started at http://localhost:${ port }` );
});