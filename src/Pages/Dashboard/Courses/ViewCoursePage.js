import React, { useEffect, useState } from "react";

import { useQuery, useMutation, useLazyQuery } from "@apollo/client";

import { useLocation } from "react-router";
import queryString from "query-string";


import { CREATE_COURSE_SECTION } from "GraphQl/Mutations/coursebuildemutation/cousresection";

import Accordions from "../components/Accordions";
import { useSelector, useDispatch } from "react-redux";
import { createSectionn } from "redux/action/CourseBuilder";
import axios from "axios";
import courseBuilderService from "services/coursebuild/course";
import { scorm_file_upload } from "api/Zoom";
import FileUploadProgress from "react-fileupload-progress";
import { GET_COURSE_SECTION_MODULE } from "../../../GraphQl/Queries/CourseBuilder/section";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { UPDATE_COURSE_SECTION_ORDER } from "GraphQl/Mutations/coursebuildemutation/cousresection";
export default function ViewCoursePage() {
 

  const [insertCourse, insertData] = useMutation(CREATE_COURSE_SECTION)
  

  const[updateCourseSectionOrder,{mutationUpdateError}]=useMutation(UPDATE_COURSE_SECTION_ORDER)
  
  
  
  const [course, setCourse] = useState([]);

  const [section, setSection] = useState({
    enable: false,
  });

  const [title, setTitle] = useState({
    title: "",
    courseid: null,
  });

  const [module, setModule] = useState([]);

  useEffect(() => {
    
    if (course) {
      const fetchcoursesectionmodule = () => {
        course.map(async (e) => {
          const response = await courseBuilderService.getCourseSectionModule(
            params.id,
            e.id
          );

          
          const uniqueResultArrayObjOne = response.filter(function (objOne) {
            return course.some(function (objTwo) {
              return objOne.section_id == objTwo.id;
            });
          });

          setModule((module) => module.concat(uniqueResultArrayObjOne));
        });
      };

      fetchcoursesectionmodule();
    }
  }, [course]);

  useEffect(()=>{
    if(insertData.data){
      console.log("heelo",insertData.data)
   

    }

  },[insertData])

  const location = useLocation();
  const params = queryString.parse(location.search);
  

  const fetchcoursesection = async () => {
    if (params.id) {
      console.log("runnig")
      
      const res = await courseBuilderService.getCourseSection(params.id);
      setCourse(res);
      console.log("runnig",res)
      setItems(res);

      return res;
    }
  };

  useEffect(() => {
    fetchcoursesection();
  }, []);

  const createSection = () => {
    setSection({
      enable: true,
    });
  };

  const updateInput = (e) => {
    setTitle({
      title: e.target.value,
      courseid: params.id ? params.id : null,
    });
  };

  const submit = (e) => {
    insertCourse({
      variables: {
        course_id: title.courseid,
        name: title.title,
      },
    });

   // fetchcoursesection();
  };

  const [uploadFile, setUploadFile] = useState("");
  const [items, setItems] = useState([]);

  const onDragEnd = (result) => {
    const newItems = Array.from(items);
    
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
   
    newItems.map((data,index)=>{ 
    updateCourseSectionOrder({
      variables: {
        id: data.id,
        order: index,
      },
    });
  });
    //setCourse(newItems);
    setItems(newItems);
  };

  return (
    <div>
      {!section.enable ? (
        <button
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange"
          onClick={() => createSection()}
        >
          Add Section
        </button>
      ) : (
        <form className="w-full max-w-sm">
          <div className="md:flex md:items-center mb-6">
            <div class="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="text"
                value={title.title}
                placeholder="Enter Section Name"
                onChange={updateInput}
              />
            </div>
            <button
              class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={submit}
            >
              Create
            </button>
          </div>
        </form>
      )}

     
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={{
                backgroundColor: snapshot.isDraggingOver ? "#d1d5db" : items ? "#fed7aa" : '',
              }}
              {...provided.droppableProps}
              className="accordion p-2"
            >
              {items  
                ? items.map((data, index) => (
                  
                    <Draggable
                      key={data.id.toString()}
                      draggableId={data.id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <Accordions
                          provided={provided}
                          snapshot={snapshot}
                          title={data.name}
                          section_id={data.id}
                          module={module ? module : ""}
                        />
                      )}
                    </Draggable>
                  ))
                : ""}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
