import express from 'express';
import userRouter from './routes/usersRoute';
const api = express();

api.use('/users', userRouter)

export default api;