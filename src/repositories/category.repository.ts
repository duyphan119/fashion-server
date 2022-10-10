import AppDataSource from "../config/dataSource";
import Category from "../entities/category.entity";

const categoryRepository = AppDataSource.getRepository(Category);

export default categoryRepository;
