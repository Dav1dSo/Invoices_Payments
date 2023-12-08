import jsPDF from 'jspdf';
import { Button } from "react-bootstrap";

const GeneratePDF = () => {
    const generatePDF = () => {
      const doc = new jsPDF();
      doc.text('Olá, este é o meu PDF!', 10, 10);
      const pdfBlob = doc.output('blob');
      const blobUrl = URL.createObjectURL(pdfBlob);
      window.open(blobUrl, '_blank');
    };
  

    return (
       <Button variant="success" onClick={generatePDF}> Visualizar PDF </Button>
    );
}

export default GeneratePDF; 