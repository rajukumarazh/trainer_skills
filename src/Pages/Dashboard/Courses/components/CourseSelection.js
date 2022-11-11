import React from 'react'
import {useQuery, useMutation, useLazyQuery} from '@apollo/client'
import {useState, useEffect} from 'react';
import DataTable from "react-data-table-component";
import Input from "../../../../components/InputGroup/Input";

import {COURSES_QUERY, GET_COURSES_PAGINATION, GET_TOTAL_COURSES} from '../../../../GraphQl/Queries/Courses'

const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
        <Input
            id="search"
            type="text"
            placeholder="Filter By Name"
            aria-label="Search Input"
            value={filterText}
            onChange={onFilter}
        />
        <button className="block w-40 h-11 mt-3 border-r-4 bg-gray-700 text-base text-white mt-1" 
                onClick={() => onClear()}
            >
                X
                </button>
    </>
);

function CourseSelection(props) {

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    // const {error, loading, data} = useQuery(GET_COURSES_PAGINATION);
    const totalCoures = useQuery(GET_TOTAL_COURSES);
    const [runQuery, availableCourses]  = useLazyQuery(GET_COURSES_PAGINATION, {
        fetchPolicy: "network-only" // Doesn't check cache before making a network request
    });

    
    const [paginationInfo, setPaginationInfo] = useState({
        page: 1,
        per_page: 100,
      });
    
    const columns = [
        {
          name: "Course Id",
          selector: (row, index) =>
            `${row.id}`,
        //   sortable: true,
        },
        {
            name: "Name",
            selector: (row, index) =>
            `${row.full_name}`,
            sortable: true,
        }
    ]

    const getCourses = async () => {
        runQuery({
            variables: paginationInfo
        })
      };

    useEffect(() => {
    // getUsers();
        console.log("Fetching courses");
        getCourses();
        
    }, [paginationInfo]);

    const handlePageChange = (page) =>
    setPaginationInfo({ ...paginationInfo, page: page });

    const handlePerRowsChange = async (newPerPage, page) =>
    setPaginationInfo({ ...paginationInfo, page: page, per_page: newPerPage });
    
    const handleRowSelection = (allSelected, selectedRows) => {
        const courseids = selectedRows.map((course) => course.id);

        //console.log('Course ids : ', courseids);

        props.updateCourseSelection(courseids, true);
    }
    
    //console.log('Available courses : ', availableCourses);
    // const rowSelectCritera = (row) => {
    //     console.log('###################################')
    //     console.log('Inside course selection ')
    //     return props.courses.indexOf(row.id) > -1;
    // }

    const getTotalCourses = () =>{
        if(totalCoures.data) {
            return totalCoures.data.courses_course_aggregate.aggregate.count;
        }
    }

    const rowSelectCritera = row => props.courses.indexOf(parseInt(row.id)) > -1;

    console.log('Props courses ; ', props.courses);

    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };
    
        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
        );
    }, [filterText, resetPaginationToggle]);


    const filteredItems = availableCourses.data?.courses_course.filter(
   	    item => item.full_name && item.full_name.toLowerCase().includes(filterText.toLowerCase()),
    );

    return (
        <div>
            <DataTable
                columns={columns}
                data={filteredItems}
                progressPending={availableCourses.loading}
                pagination
                paginationServer
                paginationTotalRows={getTotalCourses()}
                selectableRowSelected={rowSelectCritera}
                selectableRows
                // selectableRowsHighlight={true}
                paginationPerPage={100}
                paginationRowsPerPageOptions={[100, 150, 200, 250]}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                onSelectedRowsChange={({ allSelected, selectedCount, selectedRows }) => {
                    handleRowSelection(allSelected, selectedRows);
                }}
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
                paginationResetDefaultPage={resetPaginationToggle}
                persistTableHead
            />
        </div>
    )
}

export default CourseSelection
