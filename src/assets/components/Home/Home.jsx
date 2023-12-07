import { useState } from "react";
import SearchResults from "../ListClients/ListClients";

function Home() {
  const [InitialDate, setInitialDate] = useState('');
  const [FinalDate, setFinalDate] = useState('');
  const [Resfetch, setResfetch] = useState([]);

  const handleDelete = (updatedClients) => {
    setResfetch(updatedClients); // Atualize o estado dos clientes com a nova lista
  };

  const getData = async () => {
    try {
      const response = await fetch('https://fakerapi.it/api/v1/persons');
      const res = await response.json();
     
      if (Array.isArray(res.data)) {
        const filteredData = res.data.filter(client => {
        const clientDate = client.birthday;  

        return clientDate >= InitialDate && clientDate <= FinalDate;
      });

        setResfetch(filteredData)

      } else {
        throw new Error('Error inesperado');
      }
    } catch (error) {
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
              <SearchResults clients={Resfetch} onDelete={handleDelete} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  
  

}

export default Home;
