import fs from "fs";

interface IUser {
  id: String;
  name: String;
}

export const getUsersFromSchedule = (): Promise<IUser[]> => {
  const userObjects: IUser[] = [];
  fs.readFile('freebusy.txt', 'utf-8', (err: NodeJS.ErrnoException, data: string) => {
    if (err) {
      console.log(err)
    }
    const mutatedData = data.split(/\n/).filter((u) => (/[a-z]/.test(u.charAt(u.length - 2))));
    const users = mutatedData.map((u) => u.split(';'));
    users.map((u) => userObjects.push({id: u[0], name: u[1].substring(0, u[1].length - 2)}));
  });
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userObjects);
    }, 1000)
  })
}