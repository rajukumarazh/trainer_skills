export const courseCategoriesSchema = [
  {
    column_name: "name",
    type: "text",
    label: "Category Name (Mandatory)",
  },
  {
    column_name: "description",
    type: "text_area",
    label: "Description (Mandatory)",
  },
  {
    column_name: "visible",
    type: "checkbox",
    label: "Visibility on dashboard (Mandatory)",
  },
  {
    column_name: "image_url",
    type: "text",
    label: "Image URL (Optional)",
  },
];

export const courseCategoriesDisplayKyes = [
  {
    column_name: "name",
    label: "Category Name",
  },
  {
    column_name: "description",
    label: "Descriptioon",
  },
  {
    column_name: "visible",
    label: "Visibility on dashboard",
  },
  {
    column_name: "image_url",
    label: "Image URL",
  },
  {
    column_name: "created_at",
    label: "Created At",
  },
  {
    column_name: "updated_at",
    label: "Updated At",
  },
];

export const courseFields = {
  1: [
    {
      column_name: "full_name",
      type: "text",
      label: "Full Name (Mandatory)",
    },

    {
      column_name: "course_category_id",
      type: "selector",
      label: "Course Category (Mandatory)",
    },
    {
      column_name: "description",
      type: "text_area",
      label: "Description (Mandatory)",
    },
    {
      column_name: "short_name",
      type: "text",
      label: "Short Name (Optional)",
    },
    {
      column_name: "image_url",
      type: "text",
      label: "Image URL (Optional)",
    },
  ],
  2: [
    {
      column_name: "moodle_course_url",
      type: "text",
      label: "Moodle Course URL (Mandatory)",
    },
    {
      column_name: "moodle_config_id",
      type: "selector",
      label: "Moodle Server (Mandatory)",
    },
    {
      column_name: "moodle_course_id",
      type: "text",
      label: "Moodle Course Id (Mandatory)",
    },
  ],
  3: [
    {
      column_name: "start_date",
      type: "date",
      label: "Start Date (Mandatory)",
    },
    {
      column_name: "end_date",
      type: "date",
      label: "End Date (Mandatory)",
    },
    {
      column_name: "cost",
      type: "number",
      label: "Price (Optional)",
    },
    {
      column_name: "nsqf_level",
      type: "text",
      label: "NSQF Level (Optional)",
    },
    {
      column_name: "discount",
      type: "number",
      label: "Discount (Optional)",
    },
    {
      column_name: "duration",
      type: "text",
      label: "Duration (Optional)",
    },
  ],
  4: [
    {
      column_name: "publish",
      type: "checkbox",
      label: "Publish to dashboard (Mandatory)",
    },

    {
      column_name: "is_moodle_course",
      type: "checkbox",
      label: "is Moodle Course (Mandatory) ",
    },
    {
      column_name: "is_live_course",
      type: "checkbox",
      label: "is Course With Live Session (Optional)",
    },
  ],
};

export const couponCodeFields = {
  1: [
    {
      column_name: "code",
      type: "text",
      label: "Code (Mandatory)",
    },
    {
      column_name: "partner_id",
      type: "selector",
      label: "Select partner (Optional)",
    },
    {
      column_name: "start_date",
      type: "date",
      label: "Start Date (Mandatory)",
    },
    {
      column_name: "end_date",
      type: "date",
      label: "End Date (Mandatory)",
    },
    {
      column_name: "user_limit",
      type: "number",
      label: "User Limit (Mandatory)",
    },
  ],
  2: [
    {
      column_name: "discount",
      type: "number",
      label: "Discount (%) (Optional)",
    },
    {
      column_name: "abs_discount",
      type: "number",
      label: "Discount (Number) (Optional)",
    },
  ],
  3: [
    {
      column_name: "minimum_cart_amount",
      type: "number",
      label: "Minimum cart amount (Optional)",
    },
    {
      column_name: "max_usage_per_user",
      type: "number",
      label: "Maximum Usage Per User (Optional)",
    },
  ],
  4: [
    {
      column_name: "applicable_for_all_time",
      type: "checkbox",
      label: "Make it applicable all time (Optional)",
    },

    {
      column_name: "active",
      type: "checkbox",
      label: "Active (Mandatory)",
    },
  ],
};

export const slotsFields = {
  1: [
    {
      column_name: "instructor_id",
      type: "selector",
      label: "Instructor Name",
    },
  ],
};

export const batchFields = {
  1: [
    {
      column_name: "batch_name",
      type: "text",
      label: "Batch Name (Mandatory)",
    },

    {
      column_name: "course_id",
      type: "selector",
      label: "Course Name (Mandatory)",
    },

    {
      column_name: "from_time",
      type: "datetimepicker",
      label: "Event start date (Mandatory)",
      // className:
      //   "mt-1 block w-3/5 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
    },

    {
      column_name: "to_time",
      type: "datetimepicker",
      label: "Event end date (Optional)",
      // className:
      //   "mt-1 block w-3/5 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
    },

    {
      column_name: "instructor_id",
      type: "selector",
      label: "Trainer Name (Mandatory)",
    },

    {
      column_name: "min_learners",
      type: "number",
      label: "Min. No. of Learners (Optional)",
    },

    {
      column_name: "max_learners",
      type: "number",
      label: "Max. No. of Learners (Optional)",
    },

    {
      column_name: "platform",
      type: "selectorplatform",
      label: "Select Platform (Mandatory)",
    },
  ],

  2: [
    {
      column_name: "enable_partner",
      type: "checkbox",
      label: "Enable Partner",
    },
  ],
  3: [
    {
      column_name: "partner_id",
      type: "partnerselector",
      label: "Partner",
    },
  ],

  4:[
    {
      column_name: "project_id",
      type: "partnerselector",
      label: "Partner Project",
    },

  ],

  5: [
    {
      column_name: "repeat",
      type: "checkbox",
      label: "Repeat the event date above as follows ",
    },
  ],

  6: [
    {
      column_name: "slots_days",
      type: "multiselector",
      label: "Select Repeat Days (Optional)",
    },

    {
      column_name: "repeat_end_time",
      type: "datepicker",
      label: "Repeat end date (Optional)",
      className:
        "mt-1 block w-3/5 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
    },
  ],
};

export const moodleConfigSchema = [
  {
    column_name: "moodle_sp_name",
    type: "text",
    label: "Moodle service provider name WSO2",
  },
  {
    column_name: "moodle_sp_client_id",
    type: "text",
    label: "Moodle client id",
  },
  {
    column_name: "moodle_sp_secret_key",
    type: "text",
    label: "Moodle Secret Key",
  },
  {
    column_name: "moodle_sp_acs_url",
    type: "text",
    label: "Moodle ACS url",
  },
  {
    column_name: "moodle_sp_redirect_url",
    type: "text",
    label: "Moodle Redirect URL",
  },
];
