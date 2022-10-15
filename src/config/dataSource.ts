import { DataSource } from "typeorm";
import { config } from "dotenv";
import Account from "../entities/account.entity";
import Media from "../entities/media.entity";
import Category from "../entities/category.entity";
import Product from "../entities/product.entity";
import Variant from "../entities/variant.entity";
import Sku from "../entities/sku";
import ProductImage from "../entities/product-image.entity";
config();
const AppDataSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: process.env.DB_USERNAME_LOCAL,
	password: process.env.DB_PASSWORD_LOCAL,
	database: process.env.DB_NAME_LOCAL,
	entities: [Account, Media, Category, Product, Variant, Sku, ProductImage],
	synchronize: true,
	logging: true,
});

export default AppDataSource;
