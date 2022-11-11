import React from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import FilterComponent from "../../../../components/InputGroup/FilterComponent";

function CouponCodesTable(props) {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const handleButtonClick = (e, row) => {
    //console.log('clicked : ', row);
    props.updateCourseCouponCode(row);
  };

  const [paginationInfo, setPaginationInfo] = useState({
    page: 1,
    per_page: 10,
  });

  const columns = [
    {
      name: "Coupon Id",
      selector: (row, index) => `${row.id}`,
      sortable: true,
    },
    {
      name: "Code",
      selector: (row, index) => `${row.code}`,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: (row, index) => `${row.start_date}`,
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row, index) => `${row.end_date}`,
      sortable: true,
    },
    {
      name: "User Limit",
      selector: (row, index) => `${row.user_limit}`,
      sortable: true,
    },
    {
      name: "Num of users",
      selector: (row, index) => `${row.num_of_users}`,
      sortable: true,
    },
    {
      name: "Disount",
      selector: (row, index) => `${row.discount}`,
      sortable: true,
    },
    {
      cell: (row) => (
        <button
          className="bg-gray-700 p-2 text-base text-white"
          onClick={(e) => handleButtonClick(e, row)}
        >
          Edit
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const filteredItems =
    props.allCoupons.data?.courses_st_coupons_configuration.filter(
      (item) =>
        item.code && item.code.toLowerCase().includes(filterText.toLowerCase())
    );

  const handlePageChange = (page) =>
    setPaginationInfo({ ...paginationInfo, page: page });

  const handlePerRowsChange = async (newPerPage, page) =>
    setPaginationInfo({ ...paginationInfo, page: page, per_page: newPerPage });

  //console.log('Course criteris ', props.courseCriterias);
  const getTotalCourses = () => {
    if (props.totalCouponCodes.data) {
      return props.totalCouponCodes.data
        .courses_st_coupons_configuration_aggregate.aggregate.count;
    }
  };

  return (
    <div>
      <DataTable
        columns={columns}
        pagination
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        data={filteredItems}
        progressPending={props.allCoupons.loading}
        paginationTotalRows={getTotalCourses()}
        selectableRows={false}
        selectableRowsHighlight={false}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        // onSelectedRowsChange={({ allSelected, selectedCount, selectedRows }) => {
        //     handleRowSelection(allSelected, selectedRows);
        // }}
      />
    </div>
  );
}

export default CouponCodesTable;
