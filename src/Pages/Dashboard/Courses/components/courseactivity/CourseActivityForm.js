import React from 'react';
import Checkbox from "../../../../../components/InputGroup/Checkbox"
import Input from "../../../../../components/InputGroup/Input";
import TextArea from "../../../../../components/InputGroup/TextArea";
import Select from "../../../../../components/InputGroup/Select";
import { ActivityDbSchema } from './ActivityDbSchema';
import DropzoneComponent from '../../../../../components/FileUpload/DropzoneComponent'

const CourseActivityForm = ({
    updateValue,
    updateCheckbox,
    onSubmit,
    section,    
    message,
    paramValue,
    handleFileReader,
    criteriaOption
    
  }) => {
    return (
      <form onSubmit={onSubmit}>
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="flex flex-wrap">
              {ActivityDbSchema.map(({ label, column_name, type }) => (
                <div className={`${type === "text" ? "w-1/3" : "w-full"} mt-4`}>
                  {type === "text" && (
                    <Input
                      label={label}
                      type={type}
                      data-key={column_name}
                      onChange={updateValue}
                      value={section[column_name]}
                    />
                  )}
                   
                  {type === "text_area" && (
                    <TextArea
                      label={"Description"}
                      data-key={column_name}
                      onChange={updateValue}
                      value={section[column_name]}
                    />
                  )}
                  {type === "checkbox" && paramValue[0].modid!=8 && (
                    <Checkbox
                      label={label}
                      data-key={column_name}
                      onChange={updateCheckbox}
                      checked={section[column_name]}
                    />
                  )}

                {type === "file" && paramValue[0].modid!=8 && (
                    <div>
                    <label>{label}</label>
                    <input
                     onChange={handleFileReader}                
                     type="file"
                     accept=".zip,.rar,.7zip"
         
                    />
                    </div>
                  )}

                  {type=="select" && (
                    <Select
                    label={label}
                    options={ criteriaOption}
                    valueField={"value"}
                    displayField={"label"}
                    data-key={column_name}
                    onChange={(e) => updateValue(e)}
                  />

                  )}


                    {type === "file" && paramValue[0].modid==11 && (
                    <DropzoneComponent />
                  )}
                </div>
              ))}
            </div>
            {message && (
              <div className="text-green-600 text-base mt-2">{message}</div>
            )}
            {console.log("paramValue",paramValue)}
           
          </div>
  
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            
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
  
  export default CourseActivityForm;
