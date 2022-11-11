export let domain = "";

console.log("Environemnt variable ", process.env);

if (process.env.REACT_APP_BUILD_ENV == "production") {
  domain = "https://adminapi.skillstrainer.in/";
} else if (process.env.REACT_APP_BUILD_ENV == "staging") {
  domain = "https://admin.skillsscale.in/";
} else {
  // domain = "https://admin.skillsscale.in/"
  // domain = "http://admin.skillstrainer-dev.co";
  domain = "https://admin.skillsscale.in/"
  // domain = "http://admin.skillstrainer-dev.co/"
 // domain = "https://adminapi.skillstrainer.in/";
}

export let graphqlUri = "https://graphql.skillsscale.in/v1/graphql";

console.log("Environemnt variable ", process.env);

if (process.env.REACT_APP_BUILD_ENV == "production") {
  graphqlUri = "https://graphql.skillstrainer.in/v1/graphql";
} else if (process.env.REACT_APP_BUILD_ENV == "staging") {
  graphqlUri = "https://graphql.skillsscale.in/v1/graphql";
} else {
 graphqlUri = "https://graphql.skillsscale.in/v1/graphql";
 // graphqlUri = "https://graphql.skillstrainer.in/v1/graphql";
}
