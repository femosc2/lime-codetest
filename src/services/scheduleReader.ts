import fs from "fs";
import { db } from '../index';

interface IUser {
  id: string;
  name: string;
}

export interface IMeeting {
  user: string;
  startDate: Date;
  endDate: Date;
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
    users.map((u) => userObjects.push({ id: u[0], name: u[1].substring(0, u[1].length - 2) }));
    userObjects.map((u) => {
      db.ref(`users/${u.id}`).set({
        name: u.name,
        id: u.id,
      })
    }
    )
  });
}

export const getMeetingsFromSchedule = (): Promise<IMeeting[]> => {
  const meetings: IMeeting[] = [];
  fs.readFile('freebusy.txt', 'utf-8', (err: NodeJS.ErrnoException, data: string) => {
    if (err) {
      console.log(err)
    }
    const mutatedData = data.split(/\n/).filter((u) => (/[A-Z0-9]/.test(u.charAt(u.length - 2))))
  });
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(meetings);
    }, 1000)
  })
}