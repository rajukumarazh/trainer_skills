export const BATCH_ENROL_USER_SCHEMA = [
    {
      column_name: "name",
      label: "Name", 
      type: "text",
      required: true, 
    },
    
    {
      column_name: "course_id",
      label: "Select Enrolled Course ",
      type: "selector",
    },

    {
        column_name: "batch_id",
        label: "Select Course Batch ",
        type: "selector",
      },
    
   
  ];