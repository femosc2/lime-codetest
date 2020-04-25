import { Request, Response } from 'express';
import { getUsersFromSchedule } from '../../services/scheduleReader';

export const getUsers = (req: Request, res: Response) => {
  getUsersFromSchedule();
  res.send({
    users:[
    {id: 1, name: 'How to train your dragon' },
    {id: 2, name: 'Queen of Katwe'},
    ]
  })};