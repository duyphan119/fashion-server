import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, ManyToOne } from "typeorm";
import Product from "./product.entity";

export enum Gender {
	MALE = "Nam",
	FEMALE = "Nữ",
}

export enum AccountRole {
	ADMIN = "Admin",
	CUSTOMER = "Customer",
}

@Entity({ name: "skus" })
class Sku {
	@PrimaryGeneratedColumn({ name: "sku_id" })
	id: number;

	@Column({ name: "sku_code", unique: true })
	code: string;

	@Column({ default: 0 })
	inventory: number;

	@Column()
	price: number;

	@Column()
	salePrice: number;

	@ManyToOne(() => Product, (product) => product.skus)
	product?: Product;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at", default: new Date() })
	updatedAt: Date;
}
export default Sku;
