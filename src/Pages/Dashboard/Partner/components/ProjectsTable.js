import DataTable from "react-data-table-component";

export default function ProjectsTable(props) {
  const handleButtonClick = (e, row) => {
    console.log("clicked : ", row);
    props.updateSelectedProject(row);
  };

  const columns = [
    {
      name: `Project Id`,
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: `Project Name`,
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: `Project Type`,
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: `Partner ID`,
      selector: (row) => row.partner_id,
      sortable: true,
    },
    {
      name: `City`,
      selector: (row) => row.city,
      sortable: true,
    },
    {
      name: `State`,
      selector: (row) => row.state,
      sortable: true,
    },
    {
      name: `Country`,
      selector: (row) => row.country,
      sortable: true,
    },
    {
      name: 'Total Courses',
      selector: (row) => row.project_courses.length,
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

  return (
    <div>
      <DataTable
        columns={columns}
        data={props.allProjects.data?.courses_partner_projects}
        pagination
        progressPending={props.allProjects.loading}
      />
    </div>
  );
}
