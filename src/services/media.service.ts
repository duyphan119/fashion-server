import * as cloudinary from "cloudinary";
import Media from "../entities/media.entity";
import mediaRepository from "../repositories/media.repository";

export type UploadMediaDTO = {
	path: string;
};

export type CreateMediaDTO = {
	type: string;
} & UploadMediaDTO;

class MediaService {
	config() {
		cloudinary.v2.config({
			api_key: process.env.CLOUDINARY_API_KEY,
			api_secret: process.env.CLOUDINARY_API_SECRET,
			cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
		});
	}
	async upload(file: string): Promise<Media> {
		this.config();
		const { secure_url: path } = await cloudinary.v2.uploader.upload(file, {
			folder: "fashion",
		});
		const created = this.create({ path });
		return mediaRepository.save(created);
	}

	create(body: UploadMediaDTO | CreateMediaDTO) {
		return mediaRepository.create(body);
	}
}

export default new MediaService();
