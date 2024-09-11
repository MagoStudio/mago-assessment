import { PrismaClient } from "@prisma/client";
import { IncomingForm } from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { projectId } = req.query;

	if (typeof projectId !== "string") {
		return res.status(400).json({ error: "Invalid project ID" });
	}

	if (req.method === "POST") {
		const form = new IncomingForm({
			uploadDir: "./public/assets/images", // Directory to save uploaded files
			keepExtensions: true,
		});

		form.parse(req, async (err, fields, files) => {
			if (err) {
				return res.status(500).json({ error: "Failed to parse form" });
			}

			const file = files.file[0];
			const filename = file.newFilename;

			// Store file metadata in the database
			try {
				const newThumbnail = await prisma.thumbnail.create({
					data: {
						filename,
						projectId: Number.parseInt(projectId),
					},
				});
				res.status(201).json(newThumbnail);
			} catch (error) {
				res.status(500).json({ error: "Failed to add thumbnail" });
			}
		});
	} else {
		res.setHeader("Allow", ["POST"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
