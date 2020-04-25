import express from 'express';
import userRouter from './routes/usersRoute';
import meetingsRouter from './routes/meetingsRoute';
const api = express();

api.use('/users', userRouter)
api.use('/meetings', meetingsRouter)

export default api;