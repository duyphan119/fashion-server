import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import ProductImage from "./product-image.entity";

export enum VariantType {
	COLOR = "Màu sắc",
	SIZE = "Kích cỡ",
}

@Entity({ name: "variants" })
class Variant {
	@PrimaryColumn({ name: "variant_id" })
	id: string;

	@Column({ unique: true })
	name: string;

	@Column({ enum: VariantType, type: "enum" })
	type: string;

	@OneToMany(() => ProductImage, productImage=>productImage.variant)
	productImages: Array<ProductImage>

}
export default Variant;
