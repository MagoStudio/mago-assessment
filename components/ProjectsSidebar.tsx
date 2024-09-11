import type { Project } from "@prisma/client";
import { useState } from "react";
import EditableItem from "./EditableItem";

type ProjectsSidebarProps = {
	projects?: Project[];
	setSidebarOpen: (open: boolean) => void;
	setSelectedProject: (project: Project) => void;
};

export const ProjectsSidebar = ({
	projects = [],
	setSidebarOpen,
	setSelectedProject,
}: ProjectsSidebarProps) => {
	console.log("projects :>> ", projects);

	const [projectsState, setProjects] = useState<Project[]>(projects);

	const addNewProject = () => {
		// @todo: add new project

		setProjects((projectsState) => [
			...projectsState,
			{
				name: "New Project",
				id: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	};

	return (
		<aside className="w-[400px] bg-dark-500 p-3 flex flex-col gap-2 items-start">
			{/* @todo: add icon from Mago libraries */}
			<button
				className="text-xl ml-auto text-dark-300 "
				type="button"
				onClick={() => setSidebarOpen(false)}
			>
				x
			</button>
			<button
				type="button"
				onClick={addNewProject}
				className="flex py-1 items-center text-dark-300 hover:text-gray-200 space-x-2"
			>
				{/* @todo: locales ? */}
				<span className="text-lg">Create new project</span>
				<span className="text-2xl">+</span>
			</button>
			{projectsState.map((project) => (
				<EditableItem
					setSelectedProject={setSelectedProject}
					key={project.id}
					project={project}
				/>
			))}
		</aside>
	);
};
