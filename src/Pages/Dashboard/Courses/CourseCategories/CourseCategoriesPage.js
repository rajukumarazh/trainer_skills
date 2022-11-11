import React, { useEffect, useState } from "react";
import CourseCategoriesForm from "./CourseCateogoriesForm";
import { useQuery, useMutation, empty } from "@apollo/client";
import { COURSE_CATEGORY_QUERY } from "../../../../GraphQl/Queries/Courses";
import {
  CREATE_COURSE_CATEGORY_MUTATION,
  UPDATE_COURSE_CATEGORY_MUTATION,
} from "../../../../GraphQl/Mutations/Courses";
import { courseCategoriesSchema } from "../DbScchemas";
import Table from "../../../../components/Table/Table";
import Input from "../../../../components/InputGroup/Input";
import TextArea from "../../../../components/InputGroup/TextArea";
import Checkbox from "../../../../components/InputGroup/Checkbox";
import Container from "../../../../components/Container/Container";
import CourseCategoriesTable from "./CourseCategoriesTable";

function CourseCategoriesPage() {
  const courseCategories = useQuery(COURSE_CATEGORY_QUERY);
  const [insert_course_category, insert_error] = useMutation(
    CREATE_COURSE_CATEGORY_MUTATION,
    {
      refetchQueries: [COURSE_CATEGORY_QUERY],
    }
  );
  const [update_course_category, update_error] = useMutation(
    UPDATE_COURSE_CATEGORY_MUTATION,
    {
      refetchQueries: [COURSE_CATEGORY_QUERY],
    }
  );
  const [message, setMessage] = useState();

  const [category, setcategory] = useState({
    name: "",
    description: "",
    visible: false,
    image_url: "",
  });
  const [categoryModeUpdate, setCategoryModeUpdate] = useState(false);

  const updateValue = (e) => {
    const key = e.target.getAttribute("data-key");
    const value = e.target.value;
    setcategory({ ...category, [key]: value });
  };

  const updateCheckbox = (e) => {
    const key = e.target.getAttribute("data-key");
    const value = e.target.checked;
    setcategory({ ...category, [key]: value });
  };

  const submitCategory = (e) => {
    e.preventDefault();

    var local_category = { ...category };
    if (
      local_category.name === "" ||
      local_category.name === null ||
      local_category.name === undefined
    ) {
      setMessage("Category name is required");
      return;
    }
    local_category["slug"] = category.name.toLowerCase().replaceAll(" ", "-");
    if (categoryModeUpdate) {
      update_course_category({
        variables: { image_url: "", ...local_category },
      });
    } else {
      insert_course_category({
        variables: { image_url: "", ...local_category },
      });
    }

    console.log(insert_error);
    console.log(update_error);
    resetCategory();
  };
  const resetCategory = () => {
    var default_category = {
      name: "",
      description: "",
      visible: false,
      image_url: "",
    };
    setcategory(default_category);
    setCategoryModeUpdate(false);
    setMessage("");
  };
  const updateCourseCategories = (row) => {
    resetCategory();
    setCategoryModeUpdate(true);
    setcategory({ ...category, ...row });
  };
  /*
        TO DO
        Handle course validation and hooks for save message display and valiation error
  */

  return (
    <Container>
      <CourseCategoriesForm
        updateCheckbox={updateCheckbox}
        updateValue={updateValue}
        onSubmit={submitCategory}
        category={category}
        resetCategory={resetCategory}
        message={message}
      />

      <CourseCategoriesTable
        className={"shadow overflow-hidden sm:rounded-md mt-10"}
        courseCategories={courseCategories}
        updateCourseCategories={updateCourseCategories}
      />
    </Container>
  );
}

export default CourseCategoriesPage;
