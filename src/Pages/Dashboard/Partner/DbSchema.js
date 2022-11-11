export const PARTNER_SCHEMA = [
  {
    column_name: "logo",
    label: "Partner Logo (Optional)",
    type: "file",
  },
  {
    column_name: "name",
    label: "Name (Mandatory)",
    type: "text",
    required: true,
  },
  {
    column_name: "activation_start_date",
    label: "Activation Start Date (Mandatory)",
    type: "date",
    required: true,
  },
  {
    column_name: "about_partner",
    label: "About Partner (Optional)",
    type: "text_area",
  },
  {
    column_name: "activation_end_date",
    label: "Activation End Date (Mandatory)",
    type: "date",
    required: true,
  },
  {
    column_name: "contact_person_email",
    label: "Contact Email (Mandatory)",
    type: "text",
    required: true,
  },
  {
    column_name: "contact_person_name",
    label: "Contact Name (Mandatory)",
    type: "text",
  },
  {
    column_name: "contact_person_mobile_number",
    label: "Contact Mobile Number (Optional)",
    type: "text",
  },
  {
    column_name: "address",
    label: "Organization Address (Optional)",
    type: "select-address",
  },
  {
    column_name: "pin_code",
    label: "Pin Code (Optional)",
    type: "text",
  },
  // {
  //   column_name: "organization_type",
  //   label: "Select organization type",
  //   type: "select",
  //   options: [
     
  //   ],
  // },
  {
    column_name: "organization_category",
    label: "Select organization category (Optional)",
    type: "select",
    options: [
      { label: "Sector Skill Council", value: "sector_skill_council" },
      { label: "College/ Polytechnic", value: "college_polytechnic" },
      { label: "Training/ Coaching Center", value: "training_coaching_center" },
      { label: "Social Organisation/NGO", value: "social_organisation_ngo" },
      { label: "ITI", value: "iti" },
      { label: "Govt. Department", value: "govt._department" },
      { label: "Corporate", value: "corporate" },
      { label: "University", value: "university" },
      { label: "School", value: "school" },
      { label: "Other", value: "other" }
    ],
  },
  {
    column_name: "active",
    label: "Active (Mandatory)",
    type: "checkbox",
  },
];
export const PARTNER_DISPLAY_SCHEMA = [
  {
    column_name: "id",
    label: "Id",
    type: "text",
  },
  // {
  //   column_name: "organization_name",
  //   label: "Organizationo Name",
  //   type: "text",
  // },
  {
    column_name: "name",
    label: "Name",
    type: "text",
  },
  {
    column_name: "activation_start_date",
    label: "Activation Start Date",
    type: "date",
  },
  {
    column_name: "about_partner",
    label: "About Patner",
    type: "text_area",
  },
  ,
  {
    column_name: "activation_end_date",
    label: "Activation End Date",
    type: "date",
  },
  {
    column_name: "active",
    label: "Active",
    type: "checkbox",
  },
  {
    column_name: "contact_person_email",
    label: "Contact Email",
    type: "text",
  },
  {
    column_name: "contact_person_name",
    label: "Contact Name",
    type: "text",
  },
];
export const PROJECT_FIELDS = {
  1: [
    {
      column_name: "name",
      type: "text",
      label: "Project Name (Mandatory)",
    },
    {
      column_name: "type",
      type: "selector",
      label: "Project Type (Mandatory)",
    },
    {
      column_name: "partner_id",
      type: "selector",
      label: "Partner Name (Mandatory)",
    },
  ],
  2: [
    {
      column_name: "address",
      type: "address",
      label: "Address (Optional)",
    },
  ],
};

export const PROJECT_TYPES = [
  { id: "Scholarship", name: "Scholarship" },
  { id: "Course Provision", name: "Course Provision" },
];
