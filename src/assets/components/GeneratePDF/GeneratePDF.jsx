import jsPDF from 'jspdf';
import Logo from '/public/imgs/LogoElevaty.jpg';
import 'jspdf-autotable';

const GeneratePDF = ({ produtos, clients, cardsCredits }) => {

  const generatePDF = () => {
    const doc = new jsPDF();
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
    
    const drawClientBilledBox = (text, x, y, width, height, marginBottom, borderRadius) => {
      doc.setFillColor(255, 255, 255, 0);
      doc.roundedRect(x, y, width, height, borderRadius, borderRadius, 'F');
      doc.setFontSize(13); 
      doc.setTextColor(0, 0, 0);
      doc.text(text, x + 2, y + 10); 
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
    
    drawClientBilledBox('', clientInfoX, clientInfoY, 190, 80, 10, 5);
    doc.text(' ', clientInfoX + 7, clientInfoY + 12);
    doc.text(getClientDetails(), clientInfoX + 7, clientInfoY + 0); 
    drawInvoiceTable();

    yPos += 10;

    doc.save("clients.pdf");
  };

  return (
    <button className="btn btn-success" onClick={generatePDF}>
      Visualizar PDF
    </button>
  );
};

export default GeneratePDF;
