import express, { Request, Response} from "express";
import api from './api';
const app = express();
const port = 8080; // default port to listen

app.use('/api/v1', api);

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
});