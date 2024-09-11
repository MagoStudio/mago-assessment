import React, { useState } from "react";

type PhotoUploaderProps = {
	handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FileUploadButton = ({ handleFileChange }: PhotoUploaderProps) => {
	const [fileName, setFileName] = useState<string | null>(null);

	const fileInputRef = React.useRef<HTMLInputElement>(null);

	const handleButtonClick = () => {
		fileInputRef.current?.click();
	};

	return (
		<>
			<button
				type="button"
				onClick={handleButtonClick}
				className="px-4 py-2 border border-light text-light rounded hover:bg-dark-400"
			>
				Add asset
			</button>
			<input
				ref={fileInputRef}
				type="file"
				accept="image/*"
				onChange={handleFileChange}
				className="hidden"
			/>
		</>
	);
};

export default FileUploadButton;
