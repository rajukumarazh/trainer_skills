import React from 'react';
import { GET_TOTAL_PARTNRES, GET_PARTNERS_PAGINATION } from '../../../../GraphQl/Queries/Partner'
import {useQuery, useMutation, useLazyQuery} from '@apollo/client'
import DataTable from "react-data-table-component";
import FilterComponent from './UserFilterComponent';
import {useState, useEffect} from 'react'
import Select from 'react-select'

function PartnersTable(props) {

    const handleButtonClick = (e, row) => {
		console.log('clicked : ', row);
        props.editPartners(row);
	};


    const columns = [
        {
          name: "User Id",
          selector: (row, index) =>
            `${row.id}`,
        //   sortable: true,
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
            `${row.contact_person_email}`,
            sortable: true,
        },
        {
            name: "Organization",
            selector: (row, index) =>
            `${row.organization_name}`,
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
    

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    const totalUsers = useQuery(GET_TOTAL_PARTNRES);
    const [runQuery, availablePartners]  = useLazyQuery(GET_PARTNERS_PAGINATION, {
        fetchPolicy: "network-only" // Doesn't check cache before making a network request
    });

    const [paginationInfo, setPaginationInfo] = useState({
        page: 1,
        per_page: 100,
      });
    
    const getUsers = async () => {
        const {page, per_page} = paginationInfo;

        const variables = {
            page:  page * per_page,
            per_page: per_page
        }

        console.log('Varilables : ', variables);
        
        runQuery({
            variables: variables
        })
      };

    useEffect(() => {
    // getUsers();
        console.log("Fetching Users");
        getUsers();
        
    }, [paginationInfo]);

    useEffect(() => {
        setPaginationInfo({ ...paginationInfo, page: 0 });
    }, [props.searchObj])


    const handlePageChange = (page) =>
    setPaginationInfo({ ...paginationInfo, page: page });

    const handlePerRowsChange = async (newPerPage, page) =>
    setPaginationInfo({ ...paginationInfo, page: page, per_page: newPerPage });

    const getTotalUsers = () =>{
        if(totalUsers.data) {
            return totalUsers.data.courses_partner_aggregate.aggregate.count;
        }
    }

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

    const filteredItems = availablePartners.data?.courses_partner.filter(
        item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
    );


    useEffect(() => {
        console.log("Setting child refresh functions");
        props.setRefreshFunction(() => getUsers);
    }, []);


    return (
        <div>
            <div className="">
                {/* <div className="flex-row mb-5">
                    <div className="flex w-2/3">
                        <div className="flex-1">
                            Select Partner
                        </div>
                        <div className="flex-1">
                            <Select
                                options={getPartnerOptions()}
                                value={getSelectedValue(partnerId)}
                                onChange={(e) => updateSelectValue( e.value)}
                            />
                        </div>
                    </div>
                </div> */}
                <div className="flex-row w-full">
                    <DataTable
                        columns={columns}
                        data={filteredItems}
                        progressPending={availablePartners.loading}
                        pagination
                        paginationServer
                        paginationTotalRows={getTotalUsers()}
                        // selectableRowsHighlight={true}
                        paginationPerPage={100}
                        paginationRowsPerPageOptions={[100, 150, 200, 250]}
                        onChangeRowsPerPage={handlePerRowsChange}
                        onChangePage={handlePageChange}
                        subHeader
                        subHeaderComponent={subHeaderComponentMemo}
                        paginationResetDefaultPage={resetPaginationToggle}
                        persistTableHead
                    />
                </div>
            </div>
           
        </div>
    )
}

export default PartnersTable
