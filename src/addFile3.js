import { Card, Layout, Row, Col } from 'antd';
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const { Content } = Layout;

const Review = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    
    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }

    return (
        <Content>
            <Row>
                <Col span={12} offset={6}>
                    <Card title="View New File" align='left' >
                        <div style={{ overflow: 'scroll' }} >
                            <Document file="dummy2.pdf" onLoadSuccess={onDocumentLoadSuccess}>
                                <Page size="A4" pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
                            </Document>
                         </div>
                    </Card>
                </Col>
            </Row>
        </Content>
    );
}

export default Review;