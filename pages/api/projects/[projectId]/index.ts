import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { projectId } = req.query;

	if (typeof projectId !== "string") {
		return res.status(400).json({ error: "Invalid ID" });
	}

	if (req.method === "PUT") {
		try {
			const { name } = req.body;
			const updatedProject = await prisma.project.update({
				where: { id: Number.parseInt(projectId) },
				data: { name },
			});
			res.status(200).json(updatedProject);
		} catch (error) {
			res.status(500).json({ error: "Failed to update project" });
		}
	} else {
		res.setHeader("Allow", ["PUT"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
