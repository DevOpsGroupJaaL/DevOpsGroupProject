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
      fetch(`/api/s3/getObject/${pdfName}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setOutput(data);
        });
    } else if (documentType === "local") {
      setOutput(pdfFile);
    }
  }

  useEffect(() => {
    getDocument();
  }, [pdfFile]);

  if (!output) {
    return <Spin />;
  } else {
    return (
      <Content>
        <Card title="View New File" align="left">
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
