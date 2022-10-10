import { DataSource } from "typeorm";
import { config } from "dotenv";
import { Account } from "../entities/account.entity";
config();
const AppDataSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: process.env.DB_USERNAME_LOCAL,
	password: process.env.DB_PASSWORD_LOCAL,
	database: process.env.DB_NAME_LOCAL,
	entities: [Account],
	synchronize: true,
});

export default AppDataSource;
