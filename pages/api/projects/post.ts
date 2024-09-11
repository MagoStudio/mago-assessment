import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "POST") {
		try {
			const { name } = req.body;
			const project = await prisma.project.create({
				data: { name },
			});
			res.status(201).json(project);
		} catch (error) {
			res.status(500).json({ error: "Failed to create project" });
		}
	} else {
		res.setHeader("Allow", ["POST"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
