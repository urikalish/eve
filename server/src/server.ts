import * as http from 'http';
import express = require('express');
import { Request, Response } from 'express';
import { Logger } from './logger';

class Server {
	private DEFAULT_PORT = 5000;
	private PUBLIC_DIR = 'public';
	private readonly port: string | number;
	private expressServer: http.Server | null;

	constructor() {
		this.port = process.env.PORT || this.DEFAULT_PORT;
		this.expressServer = null;
	}

	handleGetRequest(req: Request, res: Response) {
		Logger.log(`Server.handleGetRequest()`);
		res.send({ msg: 'Hi from the server' });
	}

	startExpress() {
		const expressApp = express();
		expressApp.use(express.static(this.PUBLIC_DIR));
		expressApp.get('/', this.handleGetRequest);
		return expressApp.listen(this.port, () => {
			Logger.log(`Server.handleServerListen() listening. port:${this.port}`);
		});
	}

	startServer() {
		Logger.log(``);
		Logger.log(`###########################`);
		Logger.log(`# Server started          #`);
		Logger.log(`# Port: ${this.port}              #`);
		Logger.log(`###########################`);
		Logger.log(``);
		Logger.log(`Server.startServer()`);
		this.expressServer = this.startExpress();
	}
}

const server = new Server();
server.startServer();
