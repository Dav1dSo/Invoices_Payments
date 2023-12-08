import jsPDF from 'jspdf';
import Logo from '/public/imgs/LogoElevaty.jpg'

const GeneratePDF = ({ clients, cardsCredits }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    let yPos = 10;

    const logoWidth = 30; // largura desejada para a imagem (reduza este valor)
    const logoHeight = 30; // altura desejada para a imagem (reduza este valor)
    const logoX = 160; // posição X da imagem
    const logoY = yPos + 2;

    doc.addImage(Logo, 'PNG', logoX, logoY, logoWidth, logoHeight);

    // doc.setFillColor(219, 223, 230); // Cor lilás
    // doc.rect(8, yPos - 8, 60, 10, 'F'); // Retângulo para o fundo
    
    // doc.setTextColor(255, 179, 0);
    doc.text(" $ Invoices_Payments $ ", 8, yPos);
    yPos += 10; 

    const drawLilacBox = (text, x, y, width, height, marginBottom, borderRadius) => {
      doc.setFillColor(219, 223, 230);
      doc.roundedRect(x, y, width, height, borderRadius, borderRadius, 'F');
      doc.setFontSize(13); // Defina o tamanho da fonte desejado
      doc.setTextColor(0);
      doc.text(text, x + 2, y + 5);
      // Adicionando margem inferior
      y += marginBottom;
      doc.rect(x, y, width, 0.5, 'F'); // Linha de separação
    };
    
    const drawContactBox = (text, x, y, width, height, marginBottom, borderRadius) => {
      doc.setFillColor(219, 223, 230);
      doc.roundedRect(x, y, width, height, borderRadius, borderRadius, 'F');
      doc.setTextColor(0);
      doc.text(text, x + 2, y + 5);
      // Adicionando margem inferior
      y += marginBottom;
      doc.rect(x, y, width, 0.5, 'F'); // Linha de separação
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
    
    const addressX = 10;
    const contactX = 110;
    
    const boxY = yPos + 5;
    const contactBoxY = yPos + 25;

    drawLilacBox('', addressX, boxY, 90, 50, 15, 5);
    doc.text(getAddressDetails(), addressX + 7, boxY + 12);

    drawContactBox('', contactX, contactBoxY, 90, 30, 15, 5);
    doc.text(getContactDetails(), contactX + 7, contactBoxY + 12);

    // doc.text(`ID: ${clients.id}`, 10, yPos);
    // yPos += 10;
    // doc.text(`Nome Completo: ${clients.firstname} ${clients.lastname}`, 10, yPos);
    // yPos += 10;
    // doc.text(`Data de Nascimento: ${clients.birthday}`, 10, yPos);
    // yPos += 10;
    // doc.text(`Email: ${clients.email}`, 10, yPos);
    // yPos += 10;
    // doc.text(`Telefone: ${clients.phone}`, 10, yPos);
    // yPos += 10;
    // doc.text(`Endereço: ${clients.address.street}`, 10, yPos);
    // yPos += 10;
    // doc.text('Cartões:', 10, yPos);
    yPos += 10;

    // cardsCredits.forEach((card) => {
    //   doc.text(`${card.type}`, 15, yPos);
    //   yPos += 10;
    // });

    doc.save("clients.pdf");
  };

  return (
    <button className="btn btn-success" onClick={generatePDF}>
      Visualizar PDF
    </button>
  );
};

export default GeneratePDF;
