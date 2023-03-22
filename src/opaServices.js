import _ from "lodash";

const uploadOpaData = () => {
  let groupPermissions = [];
  fetch("/api/userAccessibleDocumentsForOPA")
    .then((response) => response.text())
    .then((body) => {
      const flatBody = JSON.parse(body)["res"];
      const result = flatBody.reduce((acc, curr) => {
        const { doc_id, user_id } = curr;
        if (acc[doc_id]) {
          acc[doc_id].push(user_id.toString());
        } else {
          acc[doc_id] = [user_id.toString()];
        }
        return acc;
      }, {});

      const finalResult = { GroupPermissions: result };

      fetch("/api/updateOpaPolicy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalResult),
      })
        .then((response) => response.text())
        .then((body) => {
          console.log(JSON.stringify(body));
        });
    });
};

const retrieveOpaData = (email, resource) => {
  return fetch(`/api/users/${email}`)
      .then((response) => response.text())
      .then((body) => {
        const parsedBody = JSON.parse(body);
        let userId = parsedBody.user_id;
        fetch("/api/retrieveOpaAccess/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ group: userId, resource: resource }),
        })
          .then((response) => response.status)
          .then((body) => {
            if (body === 401) {
              window.location.href = '/accessDenied'
            }
            else {return body;}
          });
    });

};

export default { uploadOpaData, retrieveOpaData };
