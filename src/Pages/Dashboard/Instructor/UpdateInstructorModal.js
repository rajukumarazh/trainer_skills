import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import UpdateInstructor from "./UpdateInstructor";

function UpdateInstructorModal({show, handleClose, id}) {
  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Instructors</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-gray">
          <UpdateInstructor id={id} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateInstructorModal;
