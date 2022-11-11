export const INSTRCTOR_SCHEMA = [
  {
    column_name: "name",
    label: "Name (Mandatory)",
    type: "text",
    required: true,
  },
  {
    column_name: "email",
    label: "Email (Mandatory)",
    type: "text",
    required: true,
    required_or: [3],
  },
  {
    column_name: "partner_id",
    label: "Select Partner (Optional)",
    type: "selector",
  },
  {
    column_name: "mobile_number",
    label: "Mobile Number (Mandatory)",
    type: "text",
    required_or: [1],
  },
  {
    column_name: "activation_start_date",
    label: "Activation start date (Mandatory)",
    type: "date",
  },
  {
    column_name: "activation_end_date",
    label: "Activation end date (Mandatory)",
    type: "date",
  },
  ,
  {
    column_name: "password",
    label: "Enter password (Mandatory)",
    type: "password",
    required: true,
  },
  {
    column_name: "confirm_password",
    label: "Confirm password (Mandatory)",
    type: "password",
    required: true,
  },
  {
    column_name: "active",
    label: "Active (Mandatory)",
    type: "checkbox",
  },
];
export const INSTRUCTOR_DISPLAY_SCHEMA = [
  {
    column_name: "name",
    label: "Name",
  },
  {
    column_name: "email",
    label: "Email",
  },
  {
    column_name: "partner_id",
    label: "Partner",
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
