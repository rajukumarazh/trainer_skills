import React, { useState } from 'react';
import Cert from './Cert';
import New from './New';
import Select from 'components/InputGroup/Select';
import { CertficateActivityDbSchema } from '../courseactivity/ActivityDbSchema';
import Input from 'components/InputGroup/Input';
import TextArea from 'components/InputGroup/TextArea';
import Checkbox from 'components/InputGroup/Checkbox';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";



const  CertDownld=({
	onCertSubmit,
	updateCertValue,
	template,
	updateCertCheckbox
})=> {
	

	const userData = {
		name: 'Admin',
		Id: 12123121,
		course: 'Auto Driving Course',
	};	 

	  const availTemplate = [		
		{ value: "1", label: "TEMPLATE 1" },
		{ value: "2", label: "TEMPLATE 2" },
		{ value: "3", label: "TEMPLATE 3" },
		{ value: "4", label: "TEMPLATE 4" },
		{ value: "5", label: "TEMPLATE 5" },
		{ value: "6", label: "TEMPLATE 6" },
	  ];

	  const[show,setShow]=useState(false);

	  const preview =()=>{

		template['cert_template'] ?  setShow(true) : setShow(false)
	  }

	return (
	  
		<div>
		<Modal
		  size="lg"
		  show={show}
		  onHide={()=>setShow(false)}
		  backdrop="static"
		  keyboard={false}
		>
		  <Modal.Header closeButton>
			<Modal.Title>Certificate Preview</Modal.Title>
		  </Modal.Header>
		  <Modal.Body className="bg-gray">
		  {template['cert_template'] && 
		  template['cert_template']==1 ? (             
            
             <Cert data={userData} />      
            
            ): template['cert_template']==2 ? (               
                <New data={userData} />                
            ): 
			'Sorry this template not available now' }
		  </Modal.Body>
		  <Modal.Footer>
			<Button variant="secondary" onClick={()=>setShow(false)}>
			  Close
			</Button>
		  </Modal.Footer>
		</Modal>
	   



		<form onSubmit={onCertSubmit}>
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="flex flex-wrap">
              {CertficateActivityDbSchema.map(({ label, column_name, type }) => (
                <div className={`${type === "text" ? "w-1/3" : "w-full"} mt-4`}>
                  {type === "text" && (
                    <Input
                      label={label}
                      type={type}
                      data-key={column_name}
                      onChange={updateCertValue}
                      value={template[column_name]}
                    />
                  )}
                   
                  {type === "text_area" && (
                    <TextArea
                      label={"Description"}
                      data-key={column_name}
                      onChange={updateCertValue}
                      value={template[column_name]}
                    />
                  )}
                  {type === "checkbox" &&  (
                    <Checkbox
                      label={label}
                      data-key={column_name}
                      onChange={updateCertCheckbox}
                      checked={template[column_name]}
                    />
                  )}

               

                  {type=="select" && (
                    <Select
                    label={label}
                    options={ availTemplate}
                    valueField={"value"}
                    displayField={"label"}
                    data-key={column_name}
                    onChange={(e) => updateCertValue(e)}
                  />

                  )}


                  
                </div>
              ))}
            </div>
           
           
           
          </div>
  
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange"
            >
              Save
            </button>
        {template['cert_template'] && template['cert_template'] ?
		(
			<button
              type="button"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange"
              onClick={preview}
			>
              Preview
            </button>

		): '' }
          </div>
        </div>
      </form>
	  </div>

	);
}

export default CertDownld;
