import _ from 'lodash'

const UploadOpaData = () => {
    let groupPermissions = [];
    fetch('/api/userAccessibleDocumentsForOPA')
    .then((response) => response.text())
    .then((body) => {
      console.log(JSON.stringify((JSON.parse(body))["res"]));
        const flatBody = (JSON.parse(body))["res"];
        const simplifiedBody = _.mapValues(_.groupBy(flatBody, data => data.document_id), clist => clist.map(data => _.omit(data, 'document_id')));
        // Loop through each key and value pair
        for (const [key, value] of Object.entries(simplifiedBody)) {
          // Check if the value is an array
          if (Array.isArray(value)) {
              // Convert each object in the array to an integer
              simplifiedBody[key] = value.map(user => user.user_id);
          }
        }
        groupPermissions = {GroupPermissions: simplifiedBody};

        console.log(JSON.stringify(groupPermissions));
        fetch('/api/updateOpaPolicy',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(groupPermissions)
          }
        ).then((response) => response.text())
         .then((body) => {
          console.log(JSON.stringify(body));
         });
        }
      );
  }

const RetrieveOpaData = (group, resource) => {
    console.log(JSON.stringify(({ "group": group, "resource": resource })));
    console.log("test")
    fetch('/api/retrieveOpaAccess/',
    {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "group": group, "resource": resource })
    }
    ).then((response) => response.status)
        .then((body) => {
        console.log(body);
        }
    );
}


export {UploadOpaData, RetrieveOpaData}
