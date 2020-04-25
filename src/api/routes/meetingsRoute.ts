import { Router } from 'express';
import { getMeetings } from '../controllers/meetingsController';
const meetingsRouter = Router();

meetingsRouter.get('/', getMeetings);

export default meetingsRouter;