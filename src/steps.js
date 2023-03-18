import { Button, message, Steps, theme, Spin } from "antd";
import { Footer } from "antd/es/layout/layout.js";
import { useState } from "react";

const StepsComponent = ({ steps, setCurrentFooter, nextButton, certificatePass, pdfName }) => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [disableSignButton, setDisabled] = useState(false);

  const next = () => {
    setCurrent(current + 1);
    setCurrentFooter(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
    setCurrentFooter(current - 1);
  };

  const contentStyle = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <>
      <div style={contentStyle}>{steps[current].content}</div>
      <div style={{ marginTop: 24 }}>
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
        {current === 0 && (
          <Button type="primary" disabled={!nextButton} onClick={() => next()}>
            Next
          </Button>
        )}
        {current === 1 && (
          <Button
            disabled={disableSignButton}
            type="primary"
            onClick={() => {
              // setDisabled(true)
              fetch("/api/dss/sign", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                  "certificate_pass": certificatePass,
                  "document_dir": pdfName,
                  "name": "Aleandro Mifsud",
                  "username": "ale"
              })
              }).then((response) => {

                  console.log(response);
                  //    next();
              });


            }}
          >
            <Spin spinning={disableSignButton}/>
            Sign
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" href="/">
            Done
          </Button>
        )}
      </div>
    </>
  );
};

const StepsFooter = ({ steps, currentFooter }) => {
  const items = steps.map((item) => ({
    key: item.step,
    title: item.title,
  }));

  return <Steps current={currentFooter} items={items} />;
};

export { StepsComponent, StepsFooter };
