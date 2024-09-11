import type { Dispatch, SetStateAction } from "react";

type HeaderProps = {
	setSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

export const Header = ({ setSidebarOpen }: HeaderProps) => {
	return (
		<header className="bg-dark-500 p-4 text-center text-light">
			<button type="button" onClick={() => setSidebarOpen((open) => !open)}>
				Projects
			</button>
		</header>
	);
};
