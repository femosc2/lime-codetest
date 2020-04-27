import { Request, Response } from 'express';
import { db } from '../../index';

export const getUsers = (req: Request, res: Response): Response<any> => {
  db.ref('/users').once('value').then((snapshot) => {
    return res.status(200).send(snapshot.toJSON());
  })
  return null;
}