import AppDataSource from "../config/dataSource";
import ProductImage from "../entities/product-image.entity";

const productImageRepository = AppDataSource.getRepository(ProductImage);

export default productImageRepository;
