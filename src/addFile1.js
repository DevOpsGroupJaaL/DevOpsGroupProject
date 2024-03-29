import { InboxOutlined } from '@ant-design/icons';
import {
    Form,
    Input,
    Steps,
    Typography,
    Upload,
    message,
    Layout,
    Card,
  } from 'antd';
import React, { useEffect } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

  const { Content } = Layout;
  const { Dragger } = Upload

    // fetch('http://opa-s-publi-zal2vmv91eh1-1427543192.eu-central-1.elb.amazonaws.com/policy',
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: policyJson
    //   }
    //  ).then((response) => response.text())
    //   .then((body) => {
    //   console.log(JSON.stringify((JSON.parse(body))["res"]));
    //     const flatBody = (JSON.parse(body))["res"];
    //     const simplifiedBody = _.mapValues(_.groupBy(flatBody, data => data.document_id), clist => clist.map(data => _.omit(data, 'document_id')));
    //     // Loop through each key and value pair
    //     for (const [key, value] of Object.entries(simplifiedBody)) {
    //       // Check if the value is an array
    //       if (Array.isArray(value)) {
    //           // Convert each object in the array to an integer
    //           simplifiedBody[key] = value.map(user => user.user_id);
    //       }
    //     }
    //     console.log(JSON.stringify(simplifiedBody));
    // }
    // );

  const UploadComponent = ({setPdfFile, setPdfName, setNextButton, setCertificatePassword, currentUser}) => {
    const props = {
      multiple: false,
      accept: '.pdf',
      customRequest: function (data) {
        const username = currentUser.username
        const fileName = `${username}/${data.file.name}`
        const formData = new FormData();
        formData.append('pdfFile', data.file);
        formData.append('fileName', fileName)

        fetch("/api/s3/putObject", {
          method: 'POST',
          body: formData
        }).then((response) => {
            setPdfFile(data.file);
            setPdfName(fileName);
            setNextButton(true);
            data.onSuccess();
        });

        fetch(`/api/users/${currentUser.email}`) // TODO: replace with current user's email using cognito getcurrentuser get email and use it here... not good but fine for mvp
          .then((response) => response.text())
          .then((body) => {
            const parsedBody = JSON.parse(body);
            let userId = parsedBody.user_id;
            fetch('/api/documents', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({'document_path': fileName, 'document_name': fileName, 'document_status': 'Signed', 'owner_user_id': userId })
            }).then((response) => console.log(response)
            );
        });


      },
      // onChange(info) {
      //   const { status } = info.file;
      //   if (status !== 'uploading') {
      //     console.log(info.file, info.fileList);
      //   }
      //   if (status === 'done') {
      //     message.success(`${info.file.name} file uploaded successfully.`);
      //   } else if (status === 'error') {
      //     message.error(`${info.file.name} file upload failed.`);
      //   }
      // },
      // onDrop(e) {
      //   console.log('Dropped files', e.dataTransfer.files);
      // }
      // onSuccess(e) {
      //   console.log("======SUCC")
      //   console.log(e)
      // }
    };


    const [data, setData] = React.useState(null);

    // useEffect(() => {
    //     // fetch("/api").then((res) => res.json()).then((data) => setData(data.message));
    //     // fetch('/api/users')
    //     // .then((response) => response.text())
    //     // .then((body) => {
    //     //     console.log(body);
    //     // });
    //     // fetch('/api/userRightsAdd', {
    //     //   method: 'POST',
    //     //   headers: {
    //     //     'Content-Type': 'application/json'
    //     //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //     //   },
    //     //   body: JSON.stringify({"user_id": "1", "document_id": "1"})
    //     // })
    //     // fetch('/api/documents', {
    //     //   method: 'POST',
    //     //   headers: {
    //     //     'Content-Type': 'application/json'
    //     //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //     //   },
    //     //   body: JSON.stringify({"document_path" : "thepath", "document_name": "thename", "document_status": "Signed", "owner_user_id" : 1})
    //     // })
    //     // .then((response) => response.text())
    //     // .then((body) => {
    //     //     console.log(body);
    //     // });
    //     fetch('/api/userAccessibleDocuments/1')
    //     .then((response) => response.text())
    //     .then((body) => {
    //         console.log(body);
    //     });

    //     console.log("test fetch");
    //   }, []
    // );

    return (
          <Card title="Upload a new file" align='left'>
          <Form layout="vertical">
            <Form.Item
              label={
                  <span>
                  Certificate Password&nbsp;
                  <span style={{ color: 'red' }}>*</span>
                </span>
              }
            >
              <Input.Password
                onChange={(pass) => {
                  setCertificatePassword(pass.target.value)
                }}
                placeholder="Certificate Password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>

            <Form.Item
              label={
                  <span>
                  File&nbsp;
                  <span style={{ color: 'red' }}>*</span>
                </span>
              }
              >
             <Dragger {...props}>
             <p className="ant-upload-drag-icon">
            <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
             <p className="ant-upload-hint">
               Support for a single or bulk upload. Strictly prohibit from uploading company data or other
               band files
             </p>
           </Dragger>
            </Form.Item>

          </Form>
        </Card>
    );
  };


  export default UploadComponent;

