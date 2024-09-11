import type { Project, Thumbnail } from "@prisma/client";
import type { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import PhotoUploader from "../components/Photouploader";
import { ProjectsSidebar } from "../components/ProjectsSidebar";
import fetchThumbnails from "../lib/fetch-thumbnails";

type LayoutProps = {
	children: React.ReactNode;
	projects?: Project[];
};

const Layout = ({ children, projects = [] }: LayoutProps) => {
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);

	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const file = event.target.files?.[0];
		if (file) {
			const formData = new FormData();
			formData.append("file", file);

			try {
				const response = await fetch(
					`/api/projects/${selectedProject.id}/upload`,
					{
						method: "POST",
						body: formData,
					},
				);

				if (!response.ok) {
					throw new Error("Failed to upload file");
				}

				const result = await response.json();
				console.log("File uploaded successfully:", result);
			} catch (error) {
				console.error(error);
			}
		}
	};

	useEffect(() => {
		if (projects.length && selectedProject) {
			// fetch thumbnails from the API
		}
	}, [projects, selectedProject]);

	return (
		// @todo: implement layout with constants spaces from Mago defined DS
		// @todo: separate them
		<div className="grid grid-rows-[auto_1fr] h-screen text-light gap-y-[1px]">
			<Header setSidebarOpen={setSidebarOpen} />
			<div className="flex">
				{sidebarOpen ? (
					<ProjectsSidebar
						projects={projects}
						setSelectedProject={setSelectedProject}
						setSidebarOpen={setSidebarOpen}
					/>
				) : null}
				<main className="flex-1 p-4 bg-black">{children}</main>
				<aside className="w-1/5 bg-dark-500 p-4 flex justify-center items-center">
					{thumbnails.length ? (
						<>
							<button
								type="button"
								onClick={() => setSidebarOpen(true)}
								className="flex py-1 items-center text-dark-300 hover:text-gray-200 space-x-2 justify-between"
							>
								<span className="text-lg">Assets</span>
								<span className="text-2xl">+</span>
							</button>
							{thumbnails.map((thumbnail) => (
								// <EditableItem key={thumbnail.id} projectName={thumbnail.filename} />
								<div key={thumbnail.id}>yoo</div>
							))}
						</>
					) : (
						<PhotoUploader handleFileChange={handleFileChange} />
					)}
				</aside>
			</div>
		</div>
	);
};

export default Layout;
