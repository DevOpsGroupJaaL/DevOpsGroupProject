import { Card, Layout, Spin, Button } from "antd";
import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
// import { RetrieveOpaData } from "../opa/opa";
// import { identity } from "lodash";

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
      if(true) {
      // Create an Amazon S3 service client object.
        fetch(`/api/s3/getObject`, {
          method: "POST",
          responseType: 'blob',
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({filename: pdfName })
        })
        .then(response => response.blob())
        .then(blob => {
          setOutput(blob);
        });
      } else {

      }
    } else if (documentType === "local") {
      setOutput(pdfFile);
    }
  }

  // const checkPerms = (name, fileName) => {
  //   RetrieveOpaData(name, fileName);
  // }

  useEffect(() => {
    getDocument();
  }, [pdfFile, pdfName]);

  if (!output) {
    return <Spin />;
  } else {
    return (
      <Content>
        <Card title="View File" align="left">
          <div style={{ overflow: "scroll"}}>
            <Document file={output} onLoadSuccess={onDocumentLoadSuccess}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Button onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber <= 1}>Previous Page</Button>
                <p style={{ margin: '0 10px' }}>Page {pageNumber} of {numPages}</p>
                <Button onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber >= numPages}>Next Page</Button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Page 
                  key={`page_${pageNumber + 1}`}
                  pageNumber={pageNumber}
                  size="A4"
                  renderTextLayer={false}
                  renderAnnotationLayer={false} 
                />
              </div>
            </Document>
          </div>
        </Card>
      </Content>
    );
  }
};

export default MyDocument;
