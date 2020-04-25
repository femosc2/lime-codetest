import { Request, Response } from 'express';
import { getMeetingsFromSchedule, IMeeting } from '../../services/scheduleReader';
import { uuid } from 'uuidv4';


export const getMeetings = (res: Response) => {
  const meetings = getMeetingsFromSchedule();
  meetings.then((meetings) => {
    res.send({
      meetings
    })})
}

export const newMeeting = (req: Request, res: Response) => {
  const meetingId = uuid();
  const newMeeting: IMeeting = {
    meetingId: uuid(),
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    user: req.body.user,
  }
  // 80239793872263082057075180946653699011;1/18/2015 10:00:00 AM;1/18/2015 11:00:00 AM;DB85D8CA4EFF97CD6C839D0523CA46F0ADD508F230F40C2D27461E557E3F6C0A1EB223E3E75AB09CC33C0244101ED800AC130094DF084DA0B03180D405FBEE376609FAC172F8F36C111F5D2185AE096D5475B800392D8E7593DC7262BF8DF4826498BC7B1780CCFEDA4613DE26AFC588115F58D2A88DE48590C5EF37CA7E5D0F\r'
}