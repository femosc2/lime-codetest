import { Request, Response } from 'express';
import { IMeeting, IUser } from '../../services/scheduleReader';
import { uuid } from 'uuidv4';
import { db } from '../../index';
import { eachDayOfInterval } from 'date-fns'

const acceptedMinutes: number[] = [0, 30];
const acceptedHours: number[] = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17]

export const getMeetings = (req: Request, res: Response): Response<IMeeting[]> => {
  db.ref('/meetings').once('value').then((snapshot) => {
    res.status(200).send(snapshot.val());
  })
  return null;
}

export const createMeeting = (req: Request, res: Response): Response<IMeeting> => {
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
      !acceptedHours.includes(endDate.getHours())
    ) {
      return res.status(400).send("Meetings can only occur in 30 minute intervals during 8-17")
    } else {
      const newMeeting: IMeeting = {
        meetingId: uuid(),
        startDate: startDate.toString(),
        endDate: endDate.toString(),
        users: req.query.users.toString().split(",")
      }

      let users: IUser[];
      let meetings: IMeeting[];
      db.ref('/users').once('value').then((snapshot) => {
        users = snapshot.val();
        newMeeting.users.map((u: string) => {
          if (!Object.keys(users).includes(u)) {
            return res.status(400).send("One of the users does not exist.")
          } else {
            db.ref('/meetings').once('value').then((snapshot) => {
              meetings = snapshot.val();
              Object.values(meetings).map((m) => {
                if (m.startDate === newMeeting.startDate) {
                  newMeeting.users.map((u: string) => {
                    if (m.users.includes(u)) {
                      return res.status(400).send("All of the requested users are not available for this meeting.")
                    }
                  })
                }
              })
              db.ref(`meetings/${newMeeting.meetingId}`).set(newMeeting)
              return res.status(200).send(newMeeting)
            }
            )
          }
        })
      })
    }
  }
}

export const suggestMeetings = (req: Request, res: Response): Response<Date[]> => {
  const reqUsers = req.query.users.toString().split(",")
  const startDate = new Date(req.query.startDate.toString());
  startDate.setHours(startDate.getHours() + 2);
  const endDate = new Date(req.query.endDate.toString());
  endDate.setHours(endDate.getHours() + 2);
  
  let meetings: IMeeting[] = [];

  db.ref('/meetings').once('value').then((snapshot) => {
    meetings = snapshot.val()

    let filteredMeetings: IMeeting[] = [];
    let suggestedMeetings: Date[] = [];
    let removedDates: Date[] = [];
    let timeslots: Date[] = getSuitableTimes(startDate, endDate);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).send("Invalid Date Format");
    }

    reqUsers.map((rq) => {
      filteredMeetings = [...filteredMeetings.concat(...Object.values(meetings).filter((m) => m.users.includes(rq)))]
    })

    if (filteredMeetings.length === 0) {
      return res.status(200).send(timeslots);
    }

    filteredMeetings.map((m) => {
      let meetingLength = getSuitableTimes(new Date(m.startDate), new Date(m.endDate))
      meetingLength.map((ml) => {
        if ((ml <= new Date(m.endDate) && ml >= new Date(m.startDate))) {
          removedDates = [...removedDates, ...timeslots.filter((ts => ts.toString() === ml.toString()))]
          suggestedMeetings = [...suggestedMeetings, ...timeslots.filter((ts => ts.toString() !== ml.toString()))]
        }
      })
    })

    suggestedMeetings = [...new Set(suggestedMeetings)].filter(sm => !removedDates.includes(sm))
    if (suggestedMeetings.length === 0) {
      return res.status(200).send("No suitable times found!");
    }
    return res.status(200).send(suggestedMeetings);
  })

  return null;


}

const getSuitableTimes = (startDate: Date, endDate: Date): Date[] => {
  const dayInterval = eachDayOfInterval({ start: startDate, end: endDate })

  let meetings: Date[] = [];

  dayInterval.map((d) => {
    acceptedHours.map((ah) => {
      const possMeeting = d.setHours(ah + 2);
      const possMeetingHalfPast = new Date(d).setMinutes(30);
      meetings.push(new Date(possMeeting));
      meetings.push(new Date(possMeetingHalfPast));
    })
  })
  return meetings;
}