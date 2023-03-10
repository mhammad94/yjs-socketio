import express from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';
import cors from 'cors';
import config from 'config';
import logger from './utils/logger';
import { YSocketIO } from 'y-socket.io/dist/server'


const port = process.env.PORT || '4000';

const host = process.env.HOST;
const corsOrigin = config.get<string>("corsOrigin");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
      origin: corsOrigin,
      credentials: true,
    },
  });

  
const ysocketio = new YSocketIO(io);    
ysocketio.initialize();
app.get("/", (_, res)  => {
    res.send("Server is up");
})

httpServer.listen(port, () => {
    logger.info("Server is listening");
    logger.info(`Server is listening at ${port}`);
})