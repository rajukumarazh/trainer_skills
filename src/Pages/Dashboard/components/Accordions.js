import React, { useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal'
import { GET_COURSE_MODULE } from "../../../GraphQl/Queries/CourseBuilder/section";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


export default function Accordions(props) {

  
  const coursemodule= useQuery(GET_COURSE_MODULE);
  console.log("module",props)

  

  const [isActive, setIsActive] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const location = useLocation();
  const params = queryString.parse(location.search);

  const addActivity = (sectionid) =>{
    setLgShow(true);
    }


  
    return (
      <div ref={props.provided.innerRef}
      snapshot={props.snapshot}
      {...props.provided.draggableProps}
      {...props.provided.dragHandleProps}>
              
      {lgShow ? (
        <Modal
                size="lg"
                show={lgShow}        
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="example-modal-sizes-title-lg">
                    Add activity
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <ul class="list-outside ...">
                {coursemodule && coursemodule.data.courses_course_module.map((data)=>{
                  return(
                <li>
                <Link
                to={'/courses/add_course_activity?id=' +params.id+ 
                '&modid='+data.id+'&secid='+props.section_id}>
                {data.name}</Link>

                
                </li>
                  )

                })}
        
                </ul>
                </Modal.Body>
              </Modal> ) : ""}

        
      <div id={props.section_id} className="mb-2">       
      <div  className="accordion-item">
        <div className="accordion-title text-black text-md bg-gray p-2">
          <div>{props.title}</div>
         
        </div>
       <div className="accordion-content p-3">
      
        <ul className="p-0">
        
          { props.module.map((data)=>        
          
          data.section_id==props.section_id ?       
          <>
          <li className="list p-2 m-3">          
           {data.name}
         
          </li>
          </>
          
          :''
         


          ) }

          

        

          </ul>


       <div className="px-4 py-3 text-right sm:px-6">       
      <button
      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange"
     type="button"
     onClick={() => addActivity(props.id)} >
        +Add activity
      </button>
      </div>
          
          </div>
      </div>
      </div>
      </div>
    );
  
 
}
