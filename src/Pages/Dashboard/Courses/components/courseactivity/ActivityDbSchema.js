export const ActivityDbSchema = [
    {
      column_name: "name",
      type: "text",
      label: "Module Name",
    },
    
    {
      column_name: "description",
      type: "text_area",
      label: "Description",
    },
   

    {
        column_name: "scorm_url",
        type: "file",
        label: "Select File",
    },
    {
      column_name: "completion_criteria",
      type: "select",
      label: "Completion Criteria",
    },
   
    
  ];


 export const CertficateActivityDbSchema=[

  {
    column_name: "name",
    type: "text",
    label: "Module Name",
  },
  
  {
    column_name: "description",
    type: "text_area",
    label: "Description",
  },
 
 {
      column_name: "cert_template",
      type: "select",
      label: "Certificate Template",
  },
  {
    column_name: "cert_enable_criteria",
    type: "checkbox",
    label: "Enable after course completion",
  },


 ] 