import jsPDF from 'jspdf';
import Logo from '/public/imgs/LogoElevaty.jpg';
import 'jspdf-autotable';

const GeneratePDF = ({ produtos, clients, cardsCredits }) => {

  const generatePDF = () => {
    const doc = new jsPDF();
    let yPos = 10;

    const logoWidth = 30; // largura desejada para a imagem (reduza este valor)
    const logoHeight = 30; // altura desejada para a imagem (reduza este valor)
    const logoX = 160; // posição X da imagem
    const logoY = yPos + 2;

    doc.addImage(Logo, 'PNG', logoX, logoY, logoWidth, logoHeight);

    doc.text(" $ Invoices_Payments $ ", 8, yPos);
    yPos += 10; 

    const drawAdressBox = (text, x, y, width, height, marginBottom, borderRadius) => {
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
    
    const drawClientBilledBox = (text, x, y, width, height, marginBottom, borderRadius) => {
      // Removendo a cor de fundo (deixando transparente)
      doc.setFillColor(255, 255, 255, 0);
      doc.roundedRect(x, y, width, height, borderRadius, borderRadius, 'F');
      doc.setFontSize(13); // Defina o tamanho da fonte desejado
      // Definindo a cor do texto como preto
      doc.setTextColor(0, 0, 0);
      doc.text(text, x + 2, y + 10); // Ajustando a posição Y para reduzir o espaçamento superior
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
    
    const getClientDetails = () => {
      const clientDetails = [
        `Nome: ${clients.firstname} ${clients.lastname}`,
        `Endereço: ${clients.address.street}`,
        `${clients.address.city, clients.address.county_code, clients.address.country}`,
        `ZipCode: ${clients.address.zipcode}`,
        `Telefone: ${clients.phone}`,
        // Inclua outras informações do cliente aqui
      ];
      return clientDetails.join('\n');
    };
    const drawInvoiceTable = () => {
      const startY = clientInfoY + 30; // Defina a posição Y para a tabela
      const columns = ["name", "Unit cost", "QTY/HR Rate", "Amount"];
    
      let subtotal = 0; // Inicializa o subtotal como zero
    
      const porcentagemTaxa = 4; // Define a porcentagem da taxa
    
      const desconto = 0; // Define o valor do desconto como 0
    
      // Calcula o subtotal somando os valores presentes na coluna "Amount"
      subtotal = produtos.reduce((total, produto) => {
        return total + parseFloat(produto.price);
      }, 0).toFixed(2);
    
      // Calcula o valor da taxa com base no subtotal e na porcentagem de taxa
      const valorTaxa = ((parseFloat(subtotal) - parseFloat(desconto)) * (porcentagemTaxa / 100)).toFixed(2);
    
      // Atualiza o valor de amount subtraindo o valor do desconto e somando a taxa
      const amount = (parseFloat(subtotal) - parseFloat(desconto) + parseFloat(valorTaxa)).toFixed(2);
    
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
        didDrawCell: (data) => {
          // Verifica se a célula atual é da coluna "Amount"
          if (data.column.index === 3) {
            // Calcula o total com base nos valores presentes na coluna "Amount"
            const totalAmount = produtos.reduce((total, produto) => {
              return total + parseFloat(produto.price);
            }, 0).toFixed(2);
            // Atualiza o texto do total na última linha da tabela
            if (data.row.index === data.table.body.length - 1) {
              const finalY = data.cell.y + 5;
              const marginTop = 10; // Define a margem superior desejada
            }
          }
        },
      });
    
      // Adiciona os campos subtotal, desconto, porcentagem de taxa e valor da taxa após a tabela
      const finalY = doc.autoTable.previous.finalY;
      const marginTop = 10; // Define a margem superior desejada
      const marginRight = 10; // Define a margem direita desejada

      doc.text(`Subtotal: $${subtotal}`, 200, finalY + marginTop, { align: 'right' });
      doc.text(`Desconto: $${desconto}`, 200, finalY + marginTop + 10, { align: 'right' });
      doc.text(`Porcentagem de Taxa: ${porcentagemTaxa}%`, 200, finalY + marginTop + 20, { align: 'right' });
      doc.text(`Valor da Taxa: $${valorTaxa}`, 200, finalY + marginTop + 30, { align: 'right' });
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
