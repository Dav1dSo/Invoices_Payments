const ClientsList = ({ clients, onSelect, onDelete }) => {

    const DataFormat = (data) => {
      const dataFormatada = new Date(data);
      return dataFormatada.toLocaleDateString('pt-BR'); 
    };

    const deleteClient = (client) => {
      const updatedClients = clients.filter((c) => c.id !== client.id);
      onDelete(updatedClients); 
    };

  return (
    <div>
      <h2 className="mt-4 mb-3 text-center">Lista de Clientes</h2>
      <table className="table text-center">
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
                <button className="btn btn-danger ms-2" onClick={() => deleteClient(client)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsList;