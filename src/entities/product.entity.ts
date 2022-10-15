import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import ProductImage from "./product-image.entity";
import Sku from "./sku";

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

	@OneToMany(() => Sku, (sku) => sku.product)
	skus: Array<Sku>;

	@OneToMany(() => ProductImage, (productImage) => productImage.product)
	productImages: Array<Sku>;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at", default: new Date() })
	updatedAt: Date;
}
export default Product;
