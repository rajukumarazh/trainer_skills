import React from 'react'
import { Link } from 'react-router-dom'

const CoursesLeftNav = () => {


    const courses = [
        { label: "Manage Courses", link:  "/courses/manage_courses" },
        { label: "Create Courses", link:  "/courses/create_courses" },
        { label: "Course Categories", link:  "/courses/course_categories" },
        { label: "Edit Moodle Configuration", link:  "/courses/course_moodle_config" },
        { label: "Edit/Create Course Criteria", link:  "/courses/course_criteria" },
        { label: "Edit/Create Coupon Codes", link:  "/courses/coupon_codes" }
    ];


    

    return (
        <div className="w-18 md:w-60 bg-gray-700 flex flex-col h-screen ">
            {courses.map((course) => {
                return (
                    <div className="text-gray-400 dark:text-white gap-y-5  text-center pt-3 hover:bg-gray-500 cursor-pointer h-12">
                        <Link className="dark:text-white text-gray-400 hover:bg-gray-500 hover:text-gray-400" to={course.link}>{course.label}</Link>
                    </div>
                )
            })}
            
        </div>
    )               
}

export default CoursesLeftNav
