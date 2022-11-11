export const courseModuleSchema = [
    {
      column_name: "name",
      type: "text",
      label: "Module Name",
    },
    {
        column_name: "type",
        type: "selector",
        label: "Select Type",
    },
    {
      column_name: "discription",
      type: "text_area",
      label: "Description",
    },
    {
      column_name: "visible",
      type: "checkbox",
      label: "Visibility on dashboard",
    },
   
    
  ];