import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export enum Gender {
	MALE = "Nam",
	FEMALE = "Nữ",
}

export enum AccountRole {
	ADMIN = "Admin",
	CUSTOMER = "Customer",
}

@Entity({ name: "products" })
class Product {
	@PrimaryGeneratedColumn({ name: "product_id" })
	id: number;

	@Column({ name: "product_name" })
	name: string;

	@Column({ unique: true })
	slug: string;

	@Column({ unique: true })
	code: string;

	@Column()
	description: string;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at", default: new Date() })
	updatedAt: Date;
}
export default Product;
