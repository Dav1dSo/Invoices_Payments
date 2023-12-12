import { useState } from "react";
import ListClients from "../ListClients/ListClients";

function Home() {
  const [InitialDate, setInitialDate] = useState('');
  const [FinalDate, setFinalDate] = useState('');
  const [CardsCredit, setCardsCredit] = useState([]);
  const [Resfetch, setResfetch] = useState([]);
  const [Produtos, setProducts] = useState([]);
  const [noCLients, setnoCLients] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleDelete = (updatedClients) => {
    setResfetch(updatedClients); 
  };
  
  const handleSelect = (client) => {
    console.log('Cliente selecionado:', client);
  };
  
  const getData = async () => {
    try {
      setLoading(true);

      const resCards_credits = await fetch('https://fakerapi.it/api/v1/credit_cards');
      const resCards = await resCards_credits.json();
      const cardCredits = resCards.data;
      
      setCardsCredit(cardCredits);
      
      const response = await fetch('https://fakerapi.it/api/v1/persons?_quantity=1000');
      const res = await response.json();
      
      const responseProducts = await fetch('https://fakerapi.it/api/v1/products');
      const resDataProducts = await responseProducts.json();
      
      setProducts(resDataProducts.data);
      
      if (Array.isArray(res.data)) {
        const filteredData = res.data.filter(client => {
          const clientDate = client.birthday;  
          return clientDate >= InitialDate && clientDate <= FinalDate;
      });
        setResfetch(filteredData)
        filteredData.length > 0 ? '' : setnoCLients(true);
        setLoading(false);
      } else {
        throw new Error('Error inesperado');
      }
    } catch (error) {
      setLoading(false);
      console.error('Erro ao buscar dados:', error);
    }
};
  
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4"> <span className="text-warning">$</span> Invoices_Payments <span className="text-warning">$</span> </h1>
      <h6 className="text-center mb-4">Preencha as os campos abaixo para filtrar clientes por data de nascimento desejada.</h6>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header text-center p-2"></div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="initial-date" className="form-label">Data de Nascimento Inicial:</label>
                  <input
                    type="date"
                    className="form-control"
                    id="initial-date"
                    value={InitialDate}
                    onChange={(e) => setInitialDate(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="final-date" className="form-label">Data de Nascimento Final:</label>
                  <input
                    type="date"
                    className="form-control"
                    id="final-date"
                    value={FinalDate}
                    onChange={(e) => setFinalDate(e.target.value)}
                  />
                </div>
                <div className="d-grid">
                  <button type="button" className="btn btn-secondary p-2" onClick={getData}>Pesquisar</button>
                </div>
              </form>
              {!loading && <ListClients produtos={Produtos} clients={Resfetch} cardsCredits={CardsCredit} onDelete={handleDelete} onSelect={handleSelect}/>}
              {loading && <h4 className="text-center mt-3 text-secondary">Carregando...</h4>}
              {!loading && noCLients &&(
                <h4 className="text-secondary text-center">Nenhum cliente encontrado com essa data.</h4>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
