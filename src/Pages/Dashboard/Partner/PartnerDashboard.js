/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";

import Select from "components/InputGroup/Select";
import {
  GET_PARTNERS,
  GET_PARTNER_PROJECTS_BY_PARTNER_ID,
} from "GraphQl/Queries/Partner";

import PartnerDashboardTable from "./components/PartnerDashboardTable";
import PartnerModal from "./components/PartnerModal";

function PartnerDashboard() {
  const [chosenPartner, setChosenPartner] = useState(-1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProjectRow, setSelectedProjectRow] = useState();

  const partners = useQuery(GET_PARTNERS);
  const [loadPartnerProj, { data, loading }] = useLazyQuery(
    GET_PARTNER_PROJECTS_BY_PARTNER_ID,
    {
      fetchPolicy: "network-only", // Doesn't check cache before making a network request
    }
  );

  useEffect(() => {
    fetchPartnerProj();
  }, [chosenPartner]);

  useEffect(() => {
    console.log("Data", data);
  }, [data]);

  const fetchPartnerProj = () => {
    loadPartnerProj({ variables: { partner_id: chosenPartner } });
    console.log("proj", data);
  };

  const chosenPartnerValue = (e) => {
    e.preventDefault();
    const value = e.target.value;
    console.log("Selected partner ID: ", value);
    setChosenPartner(value);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  console.log(partners);
  return (
    <>
      <h1 className="px-4 text-3xl font-bold">Partner Dashboard</h1>
      {modalOpen && (
        <PartnerModal
          show={modalOpen}
          selectedProjectRow={selectedProjectRow}
          handleClose={() => handleModalClose()}
        />
      )}
      <div>
        {!partners.loading && (
          <Select
            label="Partner"
            className="my-4 w-1/2"
            options={partners && partners.data?.courses_partner}
            valueField={"id"}
            displayField={"name"}
            onChange={(e) => chosenPartnerValue(e)}
          />
        )}
        {chosenPartner !== -1 ? (
          <PartnerDashboardTable
            data={data}
            loading={loading}
            setModalOpen={setModalOpen}
            setSelectedProjectRow={setSelectedProjectRow}
          />
        ) : (
          <p className="text-center my-10">
            No data to display. Please select a partner to get started.
          </p>
        )}
      </div>
    </>
  );
}

export default PartnerDashboard;
