import { Request, Response } from 'express';

export const getUsers = (req: Request, res: Response) => {
  res.send({
    users:[
    {id: 1, name: 'How to train your dragon' },
    {id: 2, name: 'Queen of Katwe'},
    ]
  })};