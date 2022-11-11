import React from 'react'
import { Link } from 'react-router-dom';
import ManageCourses from './Courses/ManageCourses'

function CoursesPage() {
    return (
        <div>
            <div className="flex-col">
                <ManageCourses />
            </div>
        </div>
    )
}

export default CoursesPage
