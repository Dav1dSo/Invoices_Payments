import { useState } from "react";

function Home() {
  const [InitialDate, setInitialDate] = useState('');
  const [FinalDate, setFinalDate] = useState('');

  const [Resfetch, setResfetch] = useState([]);

  const Data = () => {
      // Processamento de dados    
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4"> <span className="text-warning">$</span> Invoices_Payments <span className="text-warning">$</span> </h1>
      <h6 className="text-center mb-4">Preencha as os campos abaixo para filtrar clientes por data de nascimento desejada.</h6>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center p-2"></div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="start-date" className="form-label">Data de Nascimento Inicial:</label>
                  <input
                    type="date"
                    className="form-control"
                    id="start-date"
                    value={InitialDate}
                    onChange={(e) => setInitialDate(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="end-date" className="form-label">Data de Nascimento Final:</label>
                  <input
                    type="date"
                    className="form-control"
                    id="end-date"
                    value={FinalDate}
                    onChange={(e) => setFinalDate(e.target.value)}
                  />
                </div>
                <div className="d-grid">
                  <button type="button" className="btn btn-primary" onClick={Data}>Pesquisar</button>
                </div>
              </form>
              <ul className="mt-3">
                {Resfetch.map((client, index) => (
                  <li key={index}>
                    {client.nome} - {client.birthDate}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  
  

}

export default Home;
