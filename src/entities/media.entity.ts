import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Category from "./category.entity";

@Entity({ name: "medias" })
class Media {
	@PrimaryGeneratedColumn({ name: "media_id" })
	id: number;

	@Column()
	path: string;

	@Column({ name: "media_type", default: "photo" })
	type: string;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@OneToMany((type) => Category, (category) => category.media)
	categories: Category[];
}
export default Media;
