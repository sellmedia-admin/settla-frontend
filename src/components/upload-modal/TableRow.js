import React from "react";
import { CgRemove } from "react-icons/cg";

const TableRow = ({ file, removeFile, id }) => {
	return (
		<div key={file[0].name} className="flex justify-between pt-4">
			<p className="font-medium">{file[0].name.substr(0, 20)}</p>
			<div className="flex space-x-4">
				<span className="text-xs font-medium">{parseInt(file[0].size / 1000)}KB</span>
				<CgRemove className="text-red-500 cursor-pointer" onClick={() => removeFile(id)} />
			</div>
		</div>
	);
};

export const TableRow2 = ({ file, removeFile, id }) => {
	return (
		<div key={file.name} className="flex justify-between pt-4">
			<p className="font-medium">{file.name.substr(0, 20)}</p>
			<div className="flex space-x-4">
				<span className="text-xs font-medium">{parseInt(file.size / 1000)}KB</span>
				<CgRemove className="text-red-500 cursor-pointer" onClick={() => removeFile(id)} />
			</div>
		</div>
	);
};

export default TableRow;
