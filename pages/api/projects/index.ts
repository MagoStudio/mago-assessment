import type { Project } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "GET") {
		try {
			const projects: Project[] = await prisma.project.findMany();
			res.status(200).json(projects);
		} catch (error) {
			res.status(500).json({ error: "Failed to fetch projects" });
		}
	} else {
		res.setHeader("Allow", ["GET"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
