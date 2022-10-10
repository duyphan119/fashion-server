import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { config } from "dotenv";
import AppDataSource from "./config/dataSource";

config();

class App {
	public app: express.Application;

	constructor() {
		this.app = express();
		this.config();
	}

	private config(): void {
		AppDataSource.initialize()
			.then(() => {
				console.log("Data Source has been initialized!");
				this.app.use(
					cors({
						origin: "*",
						credentials: true,
					})
				);
				this.app.use(bodyParser.json());
				this.app.use(bodyParser.urlencoded({ extended: false }));
			})
			.catch((error) => {
				console.log(error);
			});
	}
}

export default new App().app;
