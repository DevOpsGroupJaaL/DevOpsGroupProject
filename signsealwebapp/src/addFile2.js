import { Card, Layout } from 'antd';
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const { Content } = Layout;

const MyDocument = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    
    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }

    return (
        <Content>
            <Card title="View New File" align='left'>

            <div style={{ overflow: 'scroll' }} >
                <Document file="dummy2.pdf" onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
                </Document>
            </div>

            </Card>
        </Content>
    );
}

export default MyDocument;