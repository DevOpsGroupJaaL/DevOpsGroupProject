import { Card, Layout, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";


pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const { Content } = Layout;

const MyDocument = ({ pdfFile, pdfName, documentType }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [output, setOutput] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function getDocument() {
    if (documentType === "aws") {
      fetch(`/api/s3/getObject`, {
        method: "POST",
        responseType: 'blob',
        headers: {
        'Content-Type': 'application/json',
        Accept: 'application/pdf',
        },
        body: JSON.stringify({filename: pdfName })
      })
      .then((res) => { 
        console.log(res)
        // res.Body.transformToString().then((string) => { console.log(string) }) 



        const file = new Blob([res], { type: 'application/pdf' });
        // window.open(URL.createObjectURL(blob));
        // res.arrayBuffer()) }
      // .then((buffer) => {
      //   console.log(buffer)
      //   const uint8array = new Uint8Array(buffer);
        setOutput(res.body);
        
          // const out = res.arrayBuffer().then((arrayBuffer) => {
          //   console.log(arrayBuffer)
          //   const uintArr = new Uint8Array(arrayBuffer)
          //   // const file = window.URL.createObjectURL(blob);
          //   // setOutput(file)
          // })
        }); 
    } else if (documentType === "local") {
      setOutput(pdfFile);
    }
  }
  

  useEffect(() => {
    getDocument();
  }, [pdfFile, pdfName]);

  if (!output) {
    return <Spin />;
  } else {
    return (
      <Content>
        <Card title="View File" align="left">
          <div style={{ overflow: "scroll" }}>
            <Document file={output} onLoadSuccess={onDocumentLoadSuccess}>
              <Page
                size="A4"
                pageNumber={pageNumber}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
          </div>
        </Card>
      </Content>
    );
  }
};

export default MyDocument;
