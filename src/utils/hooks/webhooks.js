import api from "api/Api";

export const publishChanges = () =>
  api()
    .get(`publish_changes`)
    .then(({ data }) => {
      if (data)
        alert(
          "Change publish triggered. It may take a few minutes for the changes to reflect."
        );
      else throw data;
    })
    .catch(
      (err) =>
        console.log(err) || alert("An error occured while publishing changes")
    );
