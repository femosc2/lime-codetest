import { Router } from 'express';
import { getMeetings, createMeeting, suggestMeetings } from '../controllers/meetingsController';
const meetingsRouter = Router();

meetingsRouter.get('/', getMeetings);
meetingsRouter.post('/create', createMeeting);
meetingsRouter.get('/suggest', suggestMeetings);

export default meetingsRouter;