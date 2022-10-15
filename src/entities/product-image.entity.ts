import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Media from "./media.entity";
import Product from "./product.entity";
import Variant from "./variant.entity";
@Entity({ name: "product_images" })
class ProductImage {
	@PrimaryGeneratedColumn({ name: "product_image_id" })
	id: number;

	@Column({ name: "variant_id" })
	variantId: string;

	@Column({ name: "product_id" })
	productId: number;

	@Column({ name: "media_id" })
	mediaId: number;

	@ManyToOne(() => Product, (product) => product.productImages)
	product?: Product;

	@ManyToOne(() => Product, (product) => product.productImages)
	media?: Media;

	@ManyToOne(() => Variant, (variant) => variant.productImages)
	variant?: Variant;
}
export default ProductImage;
