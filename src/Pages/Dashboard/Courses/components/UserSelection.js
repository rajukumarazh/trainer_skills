import React from 'react'
import {useQuery, useMutation, useLazyQuery} from '@apollo/client'
import { useState, useEffect } from 'react'
import DataTable from "react-data-table-component";

import {
    GET_USERS_BY_PARTNER_ID, 
    GET_USERS_BY_INSTRUCTOR_ID,
    GET_PARTNER_AND_INSTRUCTOR,
    Get_USRS_BY_PARNTER_AND_INSTRUCTOR,
    GET_USERS_QUERY_PAGINATION
} from './../../../../GraphQl/Queries/User'


function UserSelection(props) {
    let query = ''
    let variables = {}
    
    //console.log(props);

    const [paginationInfo, setPaginationInfo] = useState({
        page: 1,
        per_page: 10,
      });
    

    if (props.criteria.partner_id & props.criteria.instructor_id) {
        query = Get_USRS_BY_PARNTER_AND_INSTRUCTOR;
        variables = {
            partner_id: props.criteria.partner_id,
            instructor_id: props.criteria.instructor_id
        }
    } else if (props.criteria.instructor_id) {
        query = GET_USERS_BY_INSTRUCTOR_ID;
        variables = {
            instructor_id: props.criteria.instructor_id
        }
    } else if (props.criteria.partner_id) {
        //console.log('Query by partner id : ', props.criteria.partner_id);
        query = GET_USERS_BY_PARTNER_ID;
        variables = {
            partner_id: props.criteria.partner_id
        }
    } else {
        query = GET_USERS_QUERY_PAGINATION
    }

    //console.log('Query ', query, variables);

    const [runQuery, availableUsers] = useLazyQuery(query, {
        fetchPolicy: "network-only" // Doesn't check cache before making a network request
    });
    
    

    // const updateCheckboxInput = (e, user_id) => {
                
    //     const value = e.target.checked;
    //     props.updateUserSelection(user_id, value);
    // }

    const columns = [
        {
          name: "User Id",
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
            name: "Email",
            selector: (row, index) =>
              `${row.email}`,
            sortable: true,
        }
    ]

    const getUsers = async () => {
        runQuery({
            variables: {
                ...paginationInfo,
                ...variables
            }
        })
      };

    useEffect(() => {
    // getUsers();
        getUsers();
        
    }, [paginationInfo]);

    const handlePageChange = (page) =>
    setPaginationInfo({ ...paginationInfo, page: page });

    const handlePerRowsChange = async (newPerPage, page) =>
    setPaginationInfo({ ...paginationInfo, page: page, per_page: newPerPage });
    
    const handleRowSelection = (allSelected, selectedRows) => {

        const userIds = selectedRows.map((user) => user.id);

        //console.log('User ids : ', userIds);

        props.updateUserSelection(userIds, true);
    }

    //console.log("User data : ", availableUsers);

    const rowSelectCritera = (row) => {
        console.log('Props courses ; ', props.users);
        return props.users.indexOf(row.id) > -1;
    }
    
    return (
        <div>
           <div>
            <DataTable
                columns={columns}
                data={availableUsers.data?.courses_users}
                progressPending={availableUsers.loading}
                pagination
                paginationServer
                paginationTotalRows={20}
                selectableRows={true}
                selectableRowsHighlight={true}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                onSelectedRowsChange={({ allSelected, selectedCount, selectedRows }) => {
                    handleRowSelection(allSelected, selectedRows);
                }}
                selectableRowSelected={rowSelectCritera}
            />
        </div>
        </div>
    )
}

export default UserSelection
