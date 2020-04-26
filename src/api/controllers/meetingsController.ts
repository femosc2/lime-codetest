import { Request, Response } from 'express';
import { getMeetingsFromSchedule, IMeeting } from '../../services/scheduleReader';
import { uuid } from 'uuidv4';


export const getMeetings = (req: Request, res: Response) => {
  console.log("getting meetings")
  // const meetings = getMeetingsFromSchedule();
  // meetings.then((meetings) => {
  //   res.send({
  //     meetings
  //   })})
}

export const createMeeting = (req: Request, res: Response) => {
  let startDate;
  let endDate;
  // 2020-04-24 20:30;
  startDate = new Date(req.query.startDate.toString());
  endDate = new Date(req.query.endDate.toString());

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    res.status(400).send("Invalid Date Format");
  } else {
    console.log(startDate);
    console.log(endDate);
    const newMeeting: IMeeting = {
      meetingId: uuid(),
      startDate,
      endDate,
      user: req.query.user.toString(),
    }
    console.log(newMeeting)
    res.status(200).send({
      newMeeting
    })
  }
}