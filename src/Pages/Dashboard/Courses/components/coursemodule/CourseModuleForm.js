import React from "react";
import Checkbox from "../../../../../components/InputGroup/Checkbox"
import Input from "../../../../../components/InputGroup/Input";
import TextArea from "../../../../../components/InputGroup/TextArea";
import Select from "../../../../../components/InputGroup/Select";


import { courseModuleSchema } from "./DbSchema";

const CourseModuleForm = ({
    updateValue,
    updateCheckbox,
    onSubmit,
    module,
    reset,
    message,
    
  }) => {
    return (
      <form onSubmit={onSubmit}>
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="flex flex-wrap">
              {courseModuleSchema.map(({ label, column_name, type }) => (
                <div className={`${type === "text" ? "w-1/3" : "w-full"} mt-4`}>
                  {type === "text" && (
                    <Input
                      label={label}
                      type={type}
                      data-key={column_name}
                      onChange={updateValue}
                      value={module[column_name]}
                    />
                  )}
                   
                  {type === "text_area" && (
                    <TextArea
                      label={"Description"}
                      data-key={column_name}
                      onChange={updateValue}
                      value={module[column_name]}
                    />
                  )}
                  {type === "checkbox" && (
                    <Checkbox
                      label={"Visible"}
                      data-key={column_name}
                      onChange={updateCheckbox}
                      checked={module[column_name]}
                    />
                  )}
                </div>
              ))}
            </div>
            {message && (
              <div className="text-green-600 text-base mt-2">{message}</div>
            )}
          </div>
  
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              onClick={reset}
              type="reset"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo"
            >
              Reset
            </button>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    );
  };
  
  export default CourseModuleForm;