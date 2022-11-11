export const USER_SCHEMA = [
  {
    column_name: "name",
    label: "Name",
    type: "text",
    required: true,
  },
  {
    column_name: "email",
    label: "Email",
    type: "text",
    required: true,
    required_or: [4],
  },
  {
    column_name: "partner_id",
    label: "Select Partner",
    type: "selector",
  },
  // {
  //   column_name: "instructor_id",
  //   label: "Select Instrcutor",
  //   type: "selector",
  // },
  {
    column_name: "mobile_number",
    label: "Mobile Number",
    type: "text",
    requried: true,
    required_or: [1],
  },
  {
    column_name: "activation_start_date",
    label: "Activation start date",
    type: "date",
  },
  {
    column_name: "activation_end_date",
    label: "Activation end date",
    type: "date",
  },
  ,
  {
    column_name: "password",
    label: "Enter password",
    type: "password",
    required: true,
  },
  {
    column_name: "confirm_password",
    label: "Confirm password",
    type: "password",
    required: true,
  },
  {
    column_name: "active",
    label: "Active",
    type: "checkbox",
  },
];

export const USER_SCHEMA_DISPLAY = [
  {
    column_name: "id",
    label: "id",
  },
  {
    column_name: "name",
    label: "Name",
  },
  {
    column_name: "email",
    label: "Email",
  },
  {
    column_name: "partner.name",
    label: "Partner",
  },
  {
    column_name: "user_instructor.name",
    label: "Instrcutor",
  },
  {
    column_name: "mobile_number",
    label: "Mobile Number",
  },
  {
    column_name: "activation_start_date",
    label: "Activation start date",
  },
  {
    column_name: "activation_end_date",
    label: "Activation end date",
  },
  {
    column_name: "active",
    label: "Active",
  },
];
export const USER_SCHEMA_EDIT = [
  {
    column_name: "name",
    label: "Name",
    type: "text",
  },
  {
    column_name: "email",
    label: "Email",
    type: "text",
  },
  {
    column_name: "partner_id",
    label: "Select Partner",
    type: "selector",
  },
  // {
  //   column_name: "instructor_id",
  //   label: "Select Instrcutor",
  //   type: "selector",
  // },
  {
    column_name: "mobile_number",
    label: "Mobile Number",
    type: "text",
  },
  {
    column_name: "activation_start_date",
    label: "Activation start date",
    type: "date",
  },
  {
    column_name: "activation_end_date",
    label: "Activation end date",
    type: "date",
  },
  {
    column_name: "active",
    label: "Active",
    type: "checkbox",
  },
];
