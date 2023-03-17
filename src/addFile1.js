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
import React, {useEffect} from 'react';

  const { Content } = Layout;
  // const { Step } = Steps;
  // const { Title } = Typography;
  const { Dragger } = Upload

  const props = {
    name: 'file',
    multiple: true,
    accept: '.pdf',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };


  const UploadComponent = () => {

    const [data, setData] = React.useState(null);

    useEffect(() => {
        // fetch("/api").then((res) => res.json()).then((data) => setData(data.message));
        fetch('/api/users')
        .then((response) => response.text())
        .then((body) => {
            console.log(body);
        });
        console.log("test fetch");
      }, []
    );

    return (
          <Card title="Upload a new file" align='left'>
          <Form layout="vertical">
            <Form.Item
              label={
                  <span>
                  File name&nbsp;
                  <span style={{ color: 'red' }}>*</span>
                </span>
              }
            >
              <Input placeholder="example" />
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
