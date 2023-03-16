import { Document, Page } from 'react-pdf';
import { Card } from 'antd';

function MyPDFViewer(path) {
  return (
    <Card>
      <Document file="/path/to/my.pdf">
        <Page pageNumber={1} />
      </Document>
    </Card>
  );
}

export default MyPDFViewer;