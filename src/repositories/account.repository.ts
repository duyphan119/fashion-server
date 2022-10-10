import AppDataSource from "../config/dataSource";
import { Account } from "../entities/account.entity";

const accountRepository = AppDataSource.getRepository(Account);

export default accountRepository;
