import React from "react";
import DataTable from "react-data-table-component";
import { useSearchParams } from "react-router-dom";
// import Loader from "./Loader";

const CustomDataTable = (props) => {
	const [searchParams, setSearchParams] = useSearchParams();

	return (
		<div className="table-responsive mb-[70px]">
			<DataTable
				pagination
				// progressComponent={<Loader spin />}
				paginationServer
				paginationDefaultPage={searchParams.has("page") ? parseInt(searchParams.get("page")) : 1}
				paginationPerPage={searchParams.has("per_page") ? parseInt(searchParams.get("per_page")) : 20}
				onChangePage={(page) => {
					searchParams.set("page", page);
					setSearchParams(searchParams);
				}}
				onChangeRowsPerPage={(currentRowsPerPage) => {
					searchParams.set("per_page", currentRowsPerPage);
					setSearchParams(searchParams);
				}}
				customStyles={{
					headCells: {
						style: {
							fontWeight: "600",
							color: "#9ca3af",
						},
					},
				}}
				{...props}
			/>
		</div>
	);
};

export default CustomDataTable;
