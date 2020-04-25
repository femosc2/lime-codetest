import { Request, Response } from 'express';
import { getUsersFromSchedule } from '../../services/scheduleReader';

export const getUsers = (res: Response) => {
  const users = getUsersFromSchedule();
  users.then((users) => {
    res.send({
      users
    })})
}