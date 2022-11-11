import { GET_COURSE_SECTION } from "GraphQl/Queries/CourseBuilder/section";
import { CREATE_COURSE_SECTION } from "GraphQl/Mutations/coursebuildemutation/cousresection";
import { client } from "App";
import { GET_COURSE_SECTION_MODULE } from "GraphQl/Queries/CourseBuilder/section";
import { GET_COURSE_SCORM_PUBLISH_URL } from "GraphQl/Queries/CourseBuilder/section";
import { CHECK_MOD_TYPE } from "GraphQl/Queries/CourseBuilder/section";

class courseBuilder{

   async getCourseSection(courseid){
      const result= await client 
        .query({
            query:GET_COURSE_SECTION,
            variables: {course_id: courseid },
        }).then((res)=>
         res.data.courses_course_section
        )

        return result

    }

    getCourseSectionModule(courseid,sectionid){
      return client 
        .query({
            query:GET_COURSE_SECTION_MODULE,
            variables: {
              course_id: courseid,
              section_id: sectionid
            }
        }).then((res)=>{
          return res.data.courses_course_module_mapping
        })

    }

    insercoursesection(title,courseid){
        return client
      .mutate({
        mutation: CREATE_COURSE_SECTION,
        variables: { course_id: courseid, name:title},
      })
      .then(({ data }) => this.getCourseSection(courseid))
      .catch(console.error);
    }


    getScormPublishUrl(id){
      return client
      .mutate({
        mutation: GET_COURSE_SCORM_PUBLISH_URL,
        variables: { id: id},
      })
      .then((res)=>{
        return res.data.courses_course_module
      })
      .catch(console.error);

    }


    async checkModType(mod_id){

      const result= await client
        .query({
         query:CHECK_MOD_TYPE,
         variables: {
          id: mod_id  
         }
     }).then((res)=>
       res.data.courses_course_module[0].type
     )
    
     return result
    
      } 

}

const courseBuilderService = new courseBuilder();
export default courseBuilderService;