import AppDataSource from "../config/dataSource";
import Media from "../entities/media.entity";

const mediaRepository = AppDataSource.getRepository(Media);

export default mediaRepository;
