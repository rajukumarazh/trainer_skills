import React, { useEffect, useState } from "react";
import CourseModuleForm from './CourseModuleForm';
import { CREATE_COURSE_MODULE } from 'GraphQl/Mutations/coursebuildemutation/cousresection';
import { GET_COURSE_MODULE } from "GraphQl/Queries/CourseBuilder/section";
import { useQuery, useMutation, empty } from "@apollo/client";
import Container from "components/Container/Container";
import CourseModuleTable from "./CourseModuleTable";


export default function CourseModule() {
   
   const coursemodule= useQuery(GET_COURSE_MODULE);

    const [insert_course_module,insert_error]= useMutation(
        CREATE_COURSE_MODULE,
        {
          refetchQueries: [GET_COURSE_MODULE],
        }
    )

    const [message, setMessage] = useState();

    const [module, setModule] = useState({
        name: "",
        description: "",
        visible: false,
        type: "",
      });


const [categoryModeUpdate, setCategoryModeUpdate] = useState(false);

  const updateValue = (e) => {
    const key = e.target.getAttribute("data-key");
    const value = e.target.value;
    setModule({ ...module, [key]: value });
  };

  const updateCheckbox = (e) => {
    const key = e.target.getAttribute("data-key");
    const value = e.target.checked;
    setModule({ ...module, [key]: value });
  };

  const submitModule = (e) => {
    e.preventDefault();

    var local_category = { ...module };
    if (
      local_category.name === "" ||
      local_category.name === null ||
      local_category.name === undefined
    ) {
      setMessage("Module name is required");
      return;
    }
    
    local_category["type"]=module.name.toLowerCase().replaceAll(" ", "-");
    local_category["discription"]=module.discription;
   
   
    console.log("module",local_category)
    
    insert_course_module({
       variables: { ...local_category },
     });
    

    console.log(insert_error);
    
    reset();
  };
  const reset = () => {
    var default_module = {
      name: "",
      description: "",
      visible: false,
      type: "",
      
    };
    setModule(default_module);
    
    setMessage("");
  };

 console.log("module list",coursemodule)
  

 return (
    <Container>
      <CourseModuleForm
        updateCheckbox={updateCheckbox}
        updateValue={updateValue}
        onSubmit={submitModule}        
        reset={reset}
        module={module}
        message={message}
       
      />

      {<CourseModuleTable
        className={"shadow overflow-hidden sm:rounded-md mt-10"}
        coursemodule={coursemodule} 
        
      /> }
    </Container>
  );
}
