import { prisma } from "./prisma";

const fetchProjects = async () => {
	// fetch projects in database

	const projects = await prisma.project.findMany();
	const serializedProjects = projects.map((project) => ({
		...project,
		createdAt: project.createdAt.toISOString(),
		updatedAt: project.updatedAt.toISOString(),
	}));

	return serializedProjects;
};

export default fetchProjects;
