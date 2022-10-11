import { Entity, Column, PrimaryColumn } from "typeorm";

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
}
export default Variant;
