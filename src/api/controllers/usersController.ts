import { Request, Response } from 'express';
import { db } from '../../index';

export const getUsers = (req: Request, res: Response) => {
  db.ref('/users').once('value').then((snapshot) => {
    res.send({
      users: snapshot
    })
  })
}