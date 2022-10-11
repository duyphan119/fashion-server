import AppDataSource from "../config/dataSource";
import Product from "../entities/product.entity";

const productRepository = AppDataSource.getRepository(Product);

export default productRepository;
