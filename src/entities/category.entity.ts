import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Media from "./media.entity";

export enum GroupCategory {
	DEFAULT = "Default",
	COLLECTION = "Collection",
	TRENDING = "Trending",
}

@Entity({ name: "categories" })
class Category {
	@PrimaryGeneratedColumn({ name: "category_id" })
	id: number;

	@Column()
	name: string;

	@Column({ unique: true })
	slug: string;

	@Column({ default: "" })
	title: string;

	@Column()
	description: string;

	@Column({ default: GroupCategory.DEFAULT, enum: GroupCategory, type: "enum" })
	group: string;

	@Column({ name: "parent_id", nullable: true })
	parentId: number;

	@Column({ name: "media_id", nullable: true })
	mediaId: number;

	@ManyToOne((type) => Category, (category) => category.children)
	@JoinColumn({ name: "parent_id", referencedColumnName: "id" })
	parent?: Category;

	@OneToMany((type) => Category, (category) => category.parent)
	children: Category[];

	@ManyToOne((type) => Media, (media) => media.categories)
	media?: Media;
}
export default Category;
