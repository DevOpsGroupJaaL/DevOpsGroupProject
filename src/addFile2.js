import { Card, Layout, Row, Col } from 'antd';
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import s3_getobject from './aws/s3_getobject.js';

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
            <Row>
                <Col span={12} offset={6}>
                    <Card title="View New File" align='left' >
                        <div style={{ overflow: 'scroll' }} >
                            <Document file={s3_getobject.get("pdf-test.pdf")} onLoadSuccess={onDocumentLoadSuccess}>
                                <Page size="A4" pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
                            </Document>
                         </div>
                    </Card>
                </Col>
            </Row>
        </Content>
    );
}

export default MyDocument;
