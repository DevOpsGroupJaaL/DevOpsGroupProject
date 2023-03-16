import { Button, message, Steps, theme } from 'antd';
import { Footer } from 'antd/es/layout/layout.js';
import { useState } from 'react';
import UploadComponent from './addFile1.js';
import MyDocument from './addFile2.js';


const steps = [
  {
    step: 1,
    title: 'Upload',
    content: <UploadComponent/>,
  },
  {
    title: 'View',
    content: <MyDocument/>,
  },
  {
    title: 'Review',
    content: 'TODO',
  },
];

const items = steps.map((item) => ({
  key: item.title,
  title: item.title,
}));

const StepsComponent = ({setCurrentFooter}, items) => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);


  const next = () => {
    setCurrent(current + 1);
    setCurrentFooter(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
    setCurrentFooter(current - 1);
  };



  const contentStyle = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };


  return (
    <>
      <div style={contentStyle}>{steps[current].content}</div>
      <div style={{marginTop: 24,}}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{margin: '0 8px'}} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
};

const StepsFooter = ({currentFooter}) => {
 
  return(
  <Steps current={currentFooter} items={items} />
  );};


export { StepsComponent, StepsFooter };
