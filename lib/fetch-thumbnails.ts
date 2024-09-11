import { prisma } from "./prisma";

const fetchThumbnails = async ({ projectId }: { projectId: number }) => {
	const thumbnails = await prisma.thumbnail.findMany({ where: { projectId } });

	return thumbnails;
};

export default fetchThumbnails;
