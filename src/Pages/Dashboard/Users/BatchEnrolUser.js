import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import EditUser from './EditUsers';
import UserBatchEnrolForm from './UserBatchEnrolForm'

function BatchEnrolUser(props) {

    return (
        <div>
            <Modal
                size="lg"
                show={props.show}
                onHide={() => props.handleClose()}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Enrol Into Batch</Modal.Title>
                </Modal.Header>
                <Modal.Body> 
                    <UserBatchEnrolForm 
                        userId={props.user.id}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default BatchEnrolUser
