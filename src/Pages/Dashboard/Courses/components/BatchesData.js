import React from 'react'
import { useState,useEffect } from 'react';
import DataTable from "react-data-table-component";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";

import { GET_SLOTS_BY_BATCH_ID } from '../../../../GraphQl/Queries/BatchesQueries';
import Modal from 'react-bootstrap/Modal'
import BatchTableModal from './BatchTableModal';
import moment from 'moment'


function BatchesData(props) {
  
  const[search, { loading, error, data } ] = useLazyQuery(GET_SLOTS_BY_BATCH_ID);
  
  
 const manageBatch= (e) => {
      e.preventDefault();
    const id = e.target.getAttribute("id");
  
    search({variables:{
    batch_id: id
    }})
    
    /*
    if(data){
    setLgShow(true)
    }

    */
   
  }


  useEffect(() => {
     if(data){
      setLgShow(true)
     }

  }, [data])

  console.log("dd",data)
 

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


    const [lgShow, setLgShow] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);


   

    const handlePageChange = (page) =>
    setPaginationInfo({ ...paginationInfo, page: page });

    const handlePerRowsChange = async (newPerPage, page) =>
    setPaginationInfo({ ...paginationInfo, page: page, per_page: newPerPage });
    return (
        <div>
          
          
            <DataTable
                columns={columns}
                pagination
                data-key={columns}
                data={props.batchesData.data?.courses_course_batches}
                paginationTotalRows={20}
                selectableRows={false}
                selectableRowsHighlight={false}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                // onSelectedRowsChange={({ allSelected, selectedCount, selectedRows }) => {
                //     handleRowSelection(allSelected, selectedRows);
                // }}
            />

{lgShow ? (
<Modal
        size="lg"
        show={lgShow}
        fullscreen={fullscreen}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Batch Slots
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <BatchTableModal batchslots={data } />
        </Modal.Body>
      </Modal> ) : ""}
        </div>
    )
}

export default BatchesData
