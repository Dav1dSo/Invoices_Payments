const ClientsList = ({ clients, onSelect }) => {

    const DataFormat = (data) => {
      const dataFormatada = new Date(data);
      return dataFormatada.toLocaleDateString('pt-BR'); 
    };

  return (
    <div>
      <h2 className="mt-4 mb-3">Lista de Clientes</h2>
      <table className="table">
        <thead className="thead-dark"> {/* Adicionando classe de cor escura ao cabeçalho */}
          <tr>
            <th>Nome Completo</th>
            <th>Data de Nascimento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.firstname} {client.lastname}</td>
              <td>{DataFormat(client.birthday)}</td>
              <td>
                <button className="btn btn-info" onClick={() => onSelect(client)}>Detalhes</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsList;