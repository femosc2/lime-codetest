import express, { Request, Response} from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './swagger/swagger';
import api from './api';

const app = express();

const port = 8080; // default port to listen

app.use('/api/v1', api);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
});