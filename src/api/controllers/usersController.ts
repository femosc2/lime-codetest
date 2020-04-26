import { Request, Response } from 'express';
import { getUsersFromSchedule } from '../../services/scheduleReader';

export const getUsers = (req: Request, res: Response) => {
  const users = getUsersFromSchedule();
  // users.then((users) => {
  //   res.send({
  //     users
  //   })})
}