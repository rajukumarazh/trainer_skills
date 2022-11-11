import React, {useEffect} from "react";
import {Switch, Route, useRouteMatch} from "react-router-dom";
import CreateCoursePage from "../../Pages/Dashboard/Courses/CreateCoursePage";
import CreateBatches from "../../Pages/Dashboard/Courses/CreateBatches";
import CoursesPage from "../../Pages/Dashboard/CoursesPage";
import CourseLeftNav from "../../Pages/Dashboard/Courses/CoursesLeftNav";
import CourseCategories from "../../Pages/Dashboard/Courses/CourseCategories/CourseCategoriesPage";
import MoodleConfig from "../../Pages/Dashboard/Courses/MoodleConfig";
import ManageCourses from "../../Pages/Dashboard/Courses/ManageCourses";
import UpdateCoursePage from "../../Pages/Dashboard/Courses/UpdateCoursePage";
import CourseCriteria from "../../Pages/Dashboard/Courses/CourseCriteria";
import Container from "../../components/Container/Container";
import {AiTwotoneSetting} from "react-icons/ai";
import {GrFormAdd} from "react-icons/gr";
import {BiCategoryAlt} from "react-icons/bi";
import {FiEdit} from "react-icons/fi";
import UpdateMoodleConfig from "../../Pages/Dashboard/Courses/UpdateMoodleConfig";
import ManageCouponCodes from "../../Pages/Dashboard/Courses/ManageCouponCodes";
import ViewCoursePage from "Pages/Dashboard/Courses/ViewCoursePage";
import CourseModule from "Pages/Dashboard/Courses/components/coursemodule/CourseModule";
import CourseActivityAdd from "Pages/Dashboard/Courses/components/courseactivity/CourseActivityAdd"
import CourseModView from "Pages/Dashboard/Courses/components/coursemodule/CourseModView";

const items = [
  {
    name: "Manage",
    url: "manage_courses",
    Component: <ManageCourses />,
    icon: AiTwotoneSetting,
  },
  {
    name: "Create",
    url: "create_courses",
    Component: <CreateCoursePage />,
    icon: GrFormAdd,
  },
  {
    name: "Update",
    url: "update_course",
    Component: <UpdateCoursePage />,
    icon: GrFormAdd,
    visible: false,
  },
  {
    name: "View",
    url: "view",
    Component: <ViewCoursePage />,
    icon: GrFormAdd,
    hidden: true,
  },
  {
    name: "Add Course Activity",
    url: "add_course_activity",
    Component: <CourseActivityAdd />,
    icon: GrFormAdd,
    hidden: true,
  },

  {
    name: "Course Module",
    url: "mod",
    Component: <CourseModView />,
    icon: GrFormAdd,
    hidden: true,
  },
  {
    name: "Categories",
    url: "course_categories",
    Component: <CourseCategories />,
    icon: BiCategoryAlt,
    
  },
  {
    name: "Course Module",
    url: "course_module",
    Component: <CourseModule />,
    icon: BiCategoryAlt,
    hidden: true,
  },
  {
    name: "Edit Moodle Configuration",
    url: "course_moodle_config",
    Component: <MoodleConfig />,
    icon: FiEdit,
  },
  {
    name: "Edit/Create Course Criteria",
    url: "course_criteria",
    Component: <CourseCriteria />,
    icon: FiEdit,
  },

  {
    name: "Manage Batches",
    url: "manage_batches",
    Component: <CreateBatches />,
    icon: FiEdit,
  },
  {
    url: "course_moodle_config_update",
    Component: <UpdateMoodleConfig />,
    hidden: true,
    icon: FiEdit,
  },
  {
    name: "Edit/Create SiC Codes",
    url: "coupon_codes",
    Component: <ManageCouponCodes />,
    icon: FiEdit,
  },
];
const CourseRoutes = ({setSidebar, sidebar}) => {
  const setSidebarItems = () => setSidebar({items, active: 0});
  useEffect(() => {
    setSidebarItems();
  }, []);

  console.log("Running a componenet with ", sidebar, window.location.href);

  return (
    <Container title={"Course"}>
      {items[sidebar.active] && items[sidebar.active].Component}
    </Container>
  );
};

export default CourseRoutes;
