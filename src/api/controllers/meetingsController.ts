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
  console.log("lmao")
  // const meetingId = uuid();
  const newMeeting: IMeeting = {
    meetingId: uuid(),
    startDate: req.query.startDate.toString(),
    endDate: req.query.endDate.toString(),
    user: req.query.user.toString(),
  }
  console.log(newMeeting)
  res.send({
    newMeeting
  })
}