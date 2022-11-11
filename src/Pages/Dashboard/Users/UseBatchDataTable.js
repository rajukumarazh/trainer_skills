import React from 'react'
import DataTable from "react-data-table-component";

export default function UseBatchDataTable(props) {

    const [paginationInfo, setPaginationInfo] = useState({
        page: 1,
        per_page: 10,
      });

    const columns = [
        
        {
            name: "Batch Id",
            selector: (row, index) =>
            `${row.id}`,
            sortable: true,
        },

        {
            name: "Batch Name",
            selector: (row, index) =>
              `${row.batch_name}`,
            sortable: true,
        },
        {
            name: "Course Name",
            selector: (row, index) =>
              `${row.Courses.full_name}`,
            sortable: true,
        },
        {
            name: "Trainer Name",
            selector: (row, index) =>
              `${row.Batch_Instructor.name}`,
            sortable: true,
        },
       
        {
            name: "Start Time",
            selector: (row, index) =>
              moment(row.from_time).format("YYYY-MM-DD, h:mm"),
            sortable: true,
        },
        {
            name: "End Time",
            selector: (row, index) =>
              moment(row.to_time).format("YYYY-MM-DD, h:mm"),
            sortable: true,
        },

        

        

        {
            name: "Platform",
            selector: (row, index) =>
              `${row.platform}`,
            sortable: true,
        },

        {
            name: "Slots Days",
            selector: (row, index) =>
              `${row.slots_days}`,
            sortable: true,
        },
       
        {	
            cell: (row) => 
                <button className="bg-gray-700 p-2 text-base text-white" id={row.id} onClick={(manageBatch)} >
                 Views
                </button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ]

    const handlePageChange = (page) =>
    setPaginationInfo({ ...paginationInfo, page: page });

    const handlePerRowsChange = async (newPerPage, page) =>
    setPaginationInfo({ ...paginationInfo, page: page, per_page: newPerPage });
 
  return (
    <div> <DataTable
                columns={columns}
                pagination
                data-key={columns}
                data={props}
                paginationTotalRows={20}
                selectableRows={false}
                selectableRowsHighlight={false}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                // onSelectedRowsChange={({ allSelected, selectedCount, selectedRows }) => {
                //     handleRowSelection(allSelected, selectedRows);
                // }}
            /></div>
  )
}
