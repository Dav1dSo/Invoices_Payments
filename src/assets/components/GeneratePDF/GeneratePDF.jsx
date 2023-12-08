import jsPDF from 'jspdf';
import { Button } from "react-bootstrap";

const GeneratePDF = () => {
    const generatePDF = () => {
      const doc = new jsPDF();
  
      // Adicione o conteúdo ao PDF
      doc.text('Olá, este é o meu PDF!', 10, 10);
  
      // Obtenha o conteúdo do PDF como um data URL
      const pdfData = doc.output('datauristring');
  
      // Abra o PDF em uma nova aba do navegador
      window.open(pdfData, '_blank');
    };

    return (
       <Button variant="success" onClick={generatePDF}> Visualizar PDF </Button>
    );
}

export default GeneratePDF;