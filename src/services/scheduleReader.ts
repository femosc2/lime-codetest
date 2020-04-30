import fs from "fs";
import { db } from '../index';

export interface IUser {
  id: string;
  name: string;
}

export interface IMeeting {
  users: string[];
  startDate: string;
  endDate: string;
  meetingId: string;
}

export const getUsersFromSchedule = () => {
  fs.readFile('freebusy.txt', 'utf-8', (err: NodeJS.ErrnoException, data: string) => {
    const userObjects: IUser[] = [];
    if (err) {
      console.log(err)
    }
    const mutatedData = data.split(/\n/).filter((u) => (/[a-z]/.test(u.charAt(u.length - 2))));
    const users = mutatedData.map((u) => u.split(';'));
    users.map((u) => userObjects.push({ id: u[0], name: u[1].substring(0, u[1].length - 1) }));
    userObjects.map((u) => {
      db.ref(`users/${u.id}`).set({
        name: u.name,
        id: u.id,
      })
    }
    )
  });
}