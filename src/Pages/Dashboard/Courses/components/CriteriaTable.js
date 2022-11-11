import React from 'react'
import { useState } from 'react';
import DataTable from "react-data-table-component";

function CriteriaTable(props) {

    const handleButtonClick = (e, row) => {
		//console.log('clicked : ', row);
        props.updateCourseCompletionCriteria(row);
	};

    const [paginationInfo, setPaginationInfo] = useState({
        page: 1,
        per_page: 10,
      });

    const columns = [
        
        {
            name: "Criteria Id",
            selector: (row, index) =>
            `${row.id}`,
            sortable: true,
        },
        {
            name: "Name",
            selector: (row, index) =>
              `${row.name}`,
            sortable: true,
        },
        {
            name: "Courses",
            selector: (row, index) =>
              `${row.courses.length}`,
            sortable: true,
        },
        {
            name: "Users",
            selector: (row, index) =>
              `${row.users.length}`,
            sortable: true,
        },
        {
            name: "Published",
            selector: (row, index) =>
              `${row.apply_to_skillstrainer ? row.apply_to_skillstrainer: false}`,
            sortable: true,
        },
        {
            name: "All users",
            selector: (row, index) =>
              `${row.apply_to_all_users ? row.apply_to_all_users: false}`,
            sortable: true,
        },
        {
            name: "All courses",
            selector: (row, index) =>
              `${row.apply_to_all_courses ? row.apply_to_all_courses: false }`,
            sortable: true,
        },
        {	
            cell: (row) => 
                <button className="bg-gray-700 p-2 text-base text-white" onClick={(e) => handleButtonClick(e, row)}>
                    Edit
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
    
    //console.log('Course criteris ', props.courseCriterias);

    return (
        
        <div>
            <DataTable
                columns={columns}
                pagination
                data={props.courseCriterias.data?.courses_course_criteria}
                progressPending={props.courseCriterias.loading}
                paginationTotalRows={props.total}
                selectableRows={false}
                selectableRowsHighlight={false}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                // onSelectedRowsChange={({ allSelected, selectedCount, selectedRows }) => {
                //     handleRowSelection(allSelected, selectedRows);
                // }}
            />
        </div>
    )
}

export default CriteriaTable
