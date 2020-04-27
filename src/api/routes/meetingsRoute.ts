import { Router } from 'express';
import { getMeetings, createMeeting } from '../controllers/meetingsController';
const meetingsRouter = Router();

meetingsRouter.get('/', getMeetings);
meetingsRouter.post('/create', createMeeting);

export default meetingsRouter;