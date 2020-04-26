import { Router } from 'express';
import { getMeetings, createMeeting } from '../controllers/meetingsController';
const meetingsRouter = Router();

meetingsRouter.get('/', getMeetings);
meetingsRouter.post('/createMeeting', createMeeting);

export default meetingsRouter;