import jsPDF from 'jspdf';
import Logo from '/public/imgs/LogoElevaty.jpg';
import 'jspdf-autotable';

const GeneratePDF = ({ produtos, clients, cardsCredits }) => {

  const generatePDF = () => {
    const doc = new jsPDF({
      background: { 
        backgroundColor: 'transparent'
      }
    });
    
    let yPos = 10;

    const logoWidth = 30; 
    const logoHeight = 30; 
    const logoX = 160; 
    const logoY = yPos + 2;

    doc.addImage(Logo, 'PNG', logoX, logoY, logoWidth, logoHeight);

    doc.text(" $ Invoices_Payments $ ", 8, yPos);
    yPos += 10; 

    const drawAdressBox = (text, x, y, width, height, marginBottom, borderRadius) => {
      doc.setFillColor(219, 223, 230);
      doc.roundedRect(x, y, width, height, borderRadius, borderRadius, 'F');
      doc.setFontSize(13); 
      doc.setTextColor(0);
      doc.text(text, x + 2, y + 5);
      y += marginBottom;
      doc.rect(x, y, width, 0.5, 'F'); 
    };
    
    const drawContactBox = (text, x, y, width, height, marginBottom, borderRadius) => {
      doc.setFillColor(219, 223, 230);
      doc.roundedRect(x, y, width, height, borderRadius, borderRadius, 'F');
      doc.setTextColor(0);
      doc.text(text, x + 2, y + 5);
      y += marginBottom;
      doc.rect(x, y, width, 0.5, 'F'); 
    };
    
    const getAddressDetails = () => {
      const addressDetails = [
        `${clients.address.buildingNumber} ${clients.address.streetName}`,
        `${clients.address.street}`,
        `${clients.address.city}`,
        `/${clients.address.country}`,
        `${clients.address.zipcode}`
      ];
      return addressDetails.join('\n');
    };
    
    const getContactDetails = () => {
      const contactDetails = [
        `${clients.phone}`,
        `${clients.email}`,
        `${clients.website}`,
      ];
      return contactDetails.join('\n');
    };
    
    const getClientDetails = () => {
      const clientDetails = [
        `Nome: ${clients.firstname} ${clients.lastname}`,
        `Endereço: ${clients.address.street}`,
        `${clients.address.city, clients.address.county_code, clients.address.country}`,
        `ZipCode: ${clients.address.zipcode}`,
        `Telefone: ${clients.phone}`,
      ];
      return clientDetails.join('\n');
    };

    const drawGraySquare = () => {
      const squareWidth = 80;
      const squareHeight = 50; 
      const squareX = 10;
      const squareY = 240;
    
      doc.rect(squareX, squareY, squareWidth, squareHeight);
    
      doc.setFontSize(10);
      doc.setTextColor(0);
      const textX = squareX + 5;
      let textY = squareY + 5;
      doc.setFontSize(12); 
      doc.text("INVOICE", textX, textY);
      doc.setFontSize(10); 
      textY += 8; 
      doc.text("Invoice number", textX, textY);
      textY += 6; 
      
      const invoiceNumber = "2356625";

      const numberRectX = textX - 1;
      const numberRectY = textY - 4; 
      const numberRectWidth = doc.getStringUnitWidth(invoiceNumber) * 4;
      const numberRectHeight = 5; 
      doc.setFillColor(219, 223, 230); 
      doc.rect(numberRectX, numberRectY, numberRectWidth, numberRectHeight, 'F'); 
    
      
      doc.setTextColor(0);
      doc.text(invoiceNumber, textX, textY);


      textY += 8; 
      doc.text("Date of issue:", textX, textY);

      const currentDate = new Date();
      const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${
        (currentDate.getMonth() + 1).toString().padStart(2, '0')
      }-${currentDate.getFullYear()}`;

      textY += 6;
      
      const rectX = textX - 2; 
      const rectY = textY - 4; 
      const rectWidth = doc.getStringUnitWidth(`Date of issue: ${formattedDate}`) * 2 ; // Largura baseada no texto
      const rectHeight = 5; 
      doc.setFillColor(219, 223, 230); 
      doc.rect(rectX, rectY, rectWidth, rectHeight, 'F'); 

      doc.setTextColor(0);
      doc.text(`${formattedDate}`, textX, textY);
    };
    
    
    const drawDueDate = () => {
      const currentDate = new Date();
      let dueDate = new Date(currentDate);

      dueDate.setDate(dueDate.getDate() + 3);

      while (dueDate.getDay() === 0 || dueDate.getDay() === 6) {
        dueDate.setDate(dueDate.getDate() + 1);
      }

      const formattedDueDate = `${dueDate.getDate().toString().padStart(2, '0')}-${
        (dueDate.getMonth() + 1).toString().padStart(2, '0')
      }-${dueDate.getFullYear()}`;

      const totalPages = doc.internal.getNumberOfPages();
      const lastPageHeight = doc.internal.pageSize.height;
      const marginLeft = 12;
      doc.setPage(totalPages);

      doc.setFontSize(12);
      doc.setTextColor(184, 20, 20);
      doc.text(`Pague a fatura até a data ${formattedDueDate}`, marginLeft, lastPageHeight - 10, { align: 'left' });
    };

      const drawInvoiceTable = () => {
      const startY = clientInfoY + 30;
      const columns = ["name", "Unit cost", "QTY/HR Rate", "Amount"];
    
      let subtotal = 0; 
    
      const porcentagemTaxa = 4; 
    
      const desconto = 0; 
    
      subtotal = produtos.reduce((total, produto) => {
        return total + parseFloat(produto.price);
      }, 0).toFixed(2);
    
      const valorTaxa = ((parseFloat(subtotal) - parseFloat(desconto)) * (porcentagemTaxa / 100)).toFixed(2);
    
      const data = produtos.map(produto => [
        produto.name,
        `$${produto.price}`,
        '1',
        `$${produto.price}`,
      ]);
    
      doc.setFont("helvetica", "bold");
      doc.autoTable({
        startY,
        head: [columns],
        body: data,
        theme: 'plain',
        styles: {
          halign: 'center',
          margin: { top: 5 },
        },
        columnStyles: {
          0: { fillColor: [211, 211, 211] }, // Descrição
          1: { fillColor: [211, 211, 211] }, // Valor Unid.
          2: { fillColor: [211, 211, 211] }, // Quantidade
          3: { fillColor: [211, 211, 211] }, // Total
        },
      });
    
      const finalY = doc.autoTable.previous.finalY;
      
      const marginTop = 10; 
      const marginRight = 10; 

      const marginRightAdjusted = 200 - marginRight; 
      const total = (parseFloat(subtotal) + parseFloat(valorTaxa)).toFixed(2);

      doc.setTextColor(206, 193, 2);
      doc.text(`Total: $${total}`, marginRightAdjusted, finalY + marginTop + 40, { align: 'right' });
      doc.setTextColor(0);
      doc.text(`Subtotal: $${subtotal}`, marginRightAdjusted, finalY + marginTop, { align: 'right' });
      doc.text(`Desconto: $${desconto}`, marginRightAdjusted, finalY + marginTop + 10, { align: 'right' });
      doc.text(`Porcentagem de Taxa: ${porcentagemTaxa}%`, marginRightAdjusted, finalY + marginTop + 20, { align: 'right' });
      doc.text(`Valor da Taxa: $${valorTaxa}`, marginRightAdjusted, finalY + marginTop + 30, { align: 'right' });
    };

    const addressX = 10;
    const contactX = 110;
    
    const boxY = yPos + 5;
    const contactBoxY = yPos + 25;

    const clientInfoX = 10;
    const clientInfoY = contactBoxY + 40; 

    drawAdressBox('', addressX, boxY, 90, 50, 15, 5);
    doc.text(getAddressDetails(), addressX + 7, boxY + 12);

    drawContactBox('', contactX, contactBoxY, 90, 30, 15, 5);
    doc.text(getContactDetails(), contactX + 7, contactBoxY + 12);
    
    doc.text(' ', clientInfoX + 7, clientInfoY + 12);
    doc.text(getClientDetails(), clientInfoX + 7, clientInfoY + 0); 
    drawInvoiceTable();
    drawGraySquare();
    
    yPos += 10;
    drawDueDate();

    const blob = new Blob([doc.output('blob')], { type: 'application/pdf' });
    const pdfURL = URL.createObjectURL(blob);
    window.open(pdfURL, '_blank');
    URL.revokeObjectURL(pdfURL);

  };

  return (
    <button className="btn btn-success" onClick={generatePDF}>
      Visualizar PDF
    </button>
  );
};

export default GeneratePDF;
