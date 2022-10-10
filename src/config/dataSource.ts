import { DataSource } from "typeorm";
import { config } from "dotenv";
import Account from "../entities/account.entity";
import Media from "../entities/media.entity";
import Category from "../entities/category.entity";
config();
const AppDataSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: process.env.DB_USERNAME_LOCAL,
	password: process.env.DB_PASSWORD_LOCAL,
	database: process.env.DB_NAME_LOCAL,
	entities: [Account, Media, Category],
	synchronize: true,
	logging: true,
});

export default AppDataSource;
