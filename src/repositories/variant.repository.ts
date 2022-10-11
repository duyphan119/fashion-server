import AppDataSource from "../config/dataSource";
import Variant from "../entities/variant.entity";

const variantRepository = AppDataSource.getRepository(Variant);

export default variantRepository;
