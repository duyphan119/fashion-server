import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

export enum Gender {
	MALE = "Nam",
	FEMALE = "Nữ",
}

export enum AccountRole {
	ADMIN = "Admin",
	CUSTOMER = "Customer",
}

@Entity({ name: "accounts" })
class Account {
	@PrimaryGeneratedColumn({ name: "account_id" })
	id: number;

	@Column({ name: "full_name" })
	fullName: string;

	@Column({ unique: true })
	email: string;

	@Column({ name: "hashed_password" })
	hash: string;

	@Column({ unique: true, length: 10 })
	phone: string;

	@Column({ default: Gender.MALE, enum: Gender, type: "enum" })
	gender: string;

	@Column({ default: AccountRole.CUSTOMER, enum: AccountRole, type: "enum", name: "account_role" })
	role: string;

	@Column({ default: new Date("1999/12/31") })
	dob: Date;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;
}
export default Account;
