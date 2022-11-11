import React, { useEffect, useState } from "react";
import { ScormApi } from './ScormApi';
import courseBuilderService from "services/coursebuild/course";
import { useLocation } from 'react-router';
import queryString from 'query-string';

export default function CourseModView() {

const location = useLocation();
const params = queryString.parse(location.search);
const [publishUrl,setPublishUrl]= useState('/SITXFSA001/index_lms.html');

const getPublishUrl = async()=>{

        const rep = await courseBuilderService.getScormPublishUrl(params.id);
        setPublishUrl(rep)
        console.log("rep",rep)
    }


    useEffect(()=>{

        getPublishUrl();

    },[])

    function supports_html5_storage() {
        try {
          return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
          return false;
        }
      }
      
        //users of old browsers will not be able to save their progress localy (but they will be able to store it server side)
        if (!supports_html5_storage()){
          window.localStorage = {};
        }
        
        ScormApi(
            window,
            window.localStorage,
            //this has to be unique per each scorm you serve
            'SCORM_ID.',
    
            function(progress){
              console.log(progress);
            });


  return (
    <div>
             
            <iframe 
                src='http://scormextracts.s3-website.ap-south-1.amazonaws.com/2cbf18dc74b/index_lms.html'
                name={params.id} 
               
               style={ {height:"600px",width:"100%"}} 
               height="600"
               width="800">
          </iframe>
        </div>
  );
}
