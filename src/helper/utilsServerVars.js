import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

export const app = express(/*port*/);
export const httpServer = http.createServer(app);
export const io = new Server(httpServer);
