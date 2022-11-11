import React, { useEffect, useState } from "react";
import { useQuery, useMutation, empty } from "@apollo/client";
import CourseActivityForm from './CourseActivityForm';
import Container from "components/Container/Container";
import { useLocation } from 'react-router';
import queryString from 'query-string';
import { scorm_file_upload } from "api/Zoom";
import axios from 'axios'
import { CREATE_COURSE_SEC_MOD_SECTION } from "GraphQl/Mutations/coursebuildemutation/CourseModule";
import { Redirect } from "react-router-dom";
import {useHistory } from 'react-router-dom';
import courseBuilderService from "services/coursebuild/course";
import { listStyleType } from "tailwindcss/defaultTheme";
import CertDownld from "../certificateTemplate/CertDownld";
import { INSERT_COURSE_CERTIFICATE } from "GraphQl/Mutations/coursebuildemutation/cousresection";
import CourseQuiz from "../Quiz/CourseQuiz";
export default function CourseActivityAdd() {
  const location = useLocation();
  const params = queryString.parse(location.search);
  const history = useHistory();
  const [insert_course_module_section,{insert_error ,data}]= useMutation(
    CREATE_COURSE_SEC_MOD_SECTION   
  )

  const[insert_course_certificate,{err ,Certdata}]=useMutation(
    INSERT_COURSE_CERTIFICATE
  )

  

  const paramValue = useState({

    courseid: params.id,
    sectionid:params.secid,
    modid:params.modid

  })

  const[criteria,setCriteria]= useState([])

  // const [section, setSection] = useState({
  //   name: "",
  //   description: "",
    
  // });

  const [message, setMessage] = useState();

  const updateValue = (e) => {
    const key = e.target.getAttribute("data-key");
    const value = e.target.value;
    setCriteria({ ...criteria, [key]: value });
  };

  const updateCheckbox = (e) => {
    const key = e.target.getAttribute("data-key");
    const value = e.target.checked;
    setCriteria({ ...criteria, [key]: value });
  };

  

  const[fileName,SetFileName]= useState('');
  const[modType,setModType]=useState('');

  const criteriaOption = [
    { value: "view", label: "On View" },
    { value: "passed", label: "Passed" },
    { value: "completed", label: "Completed" },
  ];


  const [template, setTemplate] = useState([]);

	const updateCertValue = (e) => {
		const key = e.target.getAttribute("data-key");
		const value = e.target.value;
		setTemplate({ ...template, [key]: value });
	  };

    const updateCertCheckbox = (e) => {
      const key = e.target.getAttribute("data-key");
      const value = e.target.checked;
      setTemplate({ ...template, [key]: value });
    };


  const submitSection = (e) => {
    e.preventDefault();

    var formData = { ...criteria };
    if (
      formData.name === "" ||
      formData.name === null ||
      formData.name === undefined
    ) {
      setMessage("Section name is required");
      return;
    }
    
    
    
    formData['course_id']=params.id;
    formData['mod_id']=params.modid;
    formData['section_id']=params.secid;
    formData['created_date']=new Date();
    formData['file_name']=fileName;
    formData['publish_url']= ''
   
   
    console.log("module",formData)
    
     insert_course_module_section({
      variables: { ...formData },
    });  
    
  
  };

  useEffect(()=>{
   if(data){

    if( modType && modType=='certificate' && data.insert_courses_course_module_mapping ){
     
      insert_course_certificate({
        variables:{
          cert_id: template['cert_template'],
          course_id:params.id,
          mapping_id: data.insert_courses_course_module_mapping.returning[0].id,
          cert_enable_criteria:template['cert_enable_criteria']
        }
      })
    }
   console.log("mutation data",data)
   history.push('/courses/view?id='+params.id );

   }
  },[data])

  const getModType= async()=>{
  
    const type= await courseBuilderService.checkModType(params.modid);
    console.log("type",type)
    setModType(type)

  }

  useEffect(()=>{
    getModType();
  },[])

  const handleFileReader = async (event) => {
    var file = event.target.files[0];      
    
    const rep= async() => {

      const fileData = {
        file_name: file.name
      }
      const result = await scorm_file_upload(fileData);
      console.info("result",result);
      const s3UploadUrl = result.image_post_url;

      var options = {
        headers: {
          'Content-Type': file.type
        }
      };
      const axiosResponse = await axios.put(s3UploadUrl ,
        file,
        options);

      console.info("axiosResponse",axiosResponse);
      return result.file_name;
    }
    const file_name = await rep();
   
    SetFileName(file_name)
   
    /*
     Please store this file name in the backend with activity
    */


  }

  const submitCalender =(e)=>{

    e.preventDefault();
  
    console.log("submitCalender",template)

    var formCertData = { ...template };
   
    
    
    
    formCertData['course_id']=params.id;
    formCertData['mod_id']=params.modid;
    formCertData['section_id']=params.secid;
    formCertData['created_date']=new Date();  
   
    console.log("Ceryt module",formCertData)
    
     insert_course_module_section({
      variables: { ...formCertData },
    });  
  }
 

  return (
    <Container>
      {modType && modType=='certificate' ?(

       <CertDownld 
       onCertSubmit={submitCalender}
       updateCertValue={updateCertValue}
       template={template}
       updateCertCheckbox={updateCertCheckbox}
       
       />

      ): modType && modType=='scorm-package' ?
      (
      <CourseActivityForm        
        updateCheckbox={updateCheckbox}
        updateValue={updateValue}
        onSubmit={submitSection}        
        section={criteria}
        message={message}
        paramValue={paramValue}
        handleFileReader={handleFileReader}
        criteriaOption={criteriaOption}
       
      />
      ): 
      modType && modType=='quiz' ?
      (
        <CourseQuiz />
      ) : ''

      }

      
    </Container>
  );
}