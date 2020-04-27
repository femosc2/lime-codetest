import { Request, Response } from 'express';
import { IMeeting } from '../../services/scheduleReader';
import { uuid } from 'uuidv4';
import { db } from '../../index';


export const getMeetings = (req: Request, res: Response) => {
  console.log("getting meetings")
  // const meetings = getMeetingsFromSchedule();
  // meetings.then((meetings) => {
  //   res.send({
  //     meetings
  //   })})
}

export const createMeeting = (req: Request, res: Response) => {
  const acceptedMinutes: number[] = [0, 30];
  const acceptedHours: number[] = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
  const startDate = new Date(req.query.startDate.toString());
  const endDate = new Date(req.query.endDate.toString());

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    res.status(400).send("Invalid Date Format");
  } else {
    // ID FOR TESTING 103222943108469712161093620402295866178
    // DATE FOR TESTING 2020-05-25T12:30:00

    if (!acceptedMinutes.includes(startDate.getMinutes()) ||
      !acceptedHours.includes(startDate.getHours()) ||
      !acceptedMinutes.includes(startDate.getMinutes()) ||
      !acceptedMinutes.includes(endDate.getMinutes()) ||
      !acceptedHours.includes(endDate.getHours())) {
      res.status(400).send("Meetings can only occur in 30 minute intervals during 8-17")
    } else {
      const newMeeting: IMeeting = {
        meetingId: uuid(),
        startDate: startDate.toString(),
        endDate: endDate.toString(),
        users: req.query.users.toString().split(",")
      }
      // db.ref('/users').once('value').then((snapshot) => {
      //   if (snapshot.hasChild("user".includes(req.query.user.toString()))) {
      //     db.ref('/meetings').once('value').then((snapshot) => {
      //       snapshot.forEach((cs) => {
      //         if (cs.child("startDate").val() === newMeeting.startDate && cs.child("user").val() === newMeeting.users.includes(req.query.user.toString())) {
      //           res.status(400).send("There is already a meeting booked for this user at this time.")
      //         } else {
      //           db.ref(`meetings/${newMeeting.meetingId}`).set(newMeeting)
      //           res.status(200).send(newMeeting)
      //         }
      //       }
      //       )
      //     })
      //   } else {
      //     res.status(400).send("There is no user with this ID.")
      //   }
      // })
      db.ref(`meetings/${newMeeting.meetingId}`).set(newMeeting)
      res.status(200).send(newMeeting)
    }
  }
}