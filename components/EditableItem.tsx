import type { Project } from "@prisma/client";
import type React from "react";
import { useState } from "react";

const EditableItem = ({
	project,
	setSelectedProject,
}: { project: Project; setSelectedProject: (project: Project) => void }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [value, setValue] = useState(project.name);

	const handleDoubleClick = () => {
		setIsEditing(true);
	};

	const handleBlur = () => {
		setIsEditing(false);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			setIsEditing(false);
		}
	};

	return (
		<div onDoubleClick={handleDoubleClick} className="w-full">
			{isEditing ? (
				<input
					className="bg-dark-400 py-2 px-1 focus:border focus:border-primary w-full box-border rounded focus:outline-none"
					type="text"
					value={value}
					onChange={handleChange}
					onBlur={handleBlur}
					onKeyDown={handleKeyDown}
					// biome-ignore lint/a11y/noAutofocus: an error with my biome todo later
					autoFocus
				/>
			) : (
				<li
					onKeyUp={(event) => {
						if (event.key === "Enter") {
							setSelectedProject(project);
						}
					}}
					onClick={() => setSelectedProject(project)}
					className="py-2 px-1 list-none bg-dark-400"
				>
					{value}
				</li>
			)}
		</div>
	);
};

export default EditableItem;
