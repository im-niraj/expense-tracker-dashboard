import React from "react";
import DataTable from "react-data-table-component";

const DataTableReact = ({ columns, data }) => {
    // const columns = [
    //     {
    //         name: "#",
    //         selector: (row, i) => i + 1,
    //         width: "100px",
    //     },
    //     {
    //         name: "Amount",
    //         selector: (row) => row.title,
    //     },
    //     {
    //         name: "Transaction Node",
    //         selector: (row) => row.year,
    //     },
    //     {
    //         name: "Date",
    //         selector: (row) => row.year,
    //     },
    //     {
    //         name: "Transaction Id",
    //         selector: (row) => row.year,
    //     },
    // ];

    // const data = [
    //     {
    //         id: 1,
    //         title: "Beetlejuice",
    //         year: "1988",
    //     },
    //     {
    //         id: 2,
    //         title: "Ghostbusters",
    //         year: "1984",
    //     },
    // ];
    const paginationComponentOptions = {
        rowsPerPageText: "Rows per page",
        rangeSeparatorText: "/",
        selectAllRowsItem: true,
        selectAllRowsItemText: "All",
    };
    return <DataTable columns={columns} data={data} pagination paginationComponentOptions={paginationComponentOptions} />;
};

export default DataTableReact;
