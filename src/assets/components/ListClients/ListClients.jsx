import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import GeneratePDF from "../GeneratePDF/GeneratePDF";

const ClientsList = ({ cardsCredits, clients, onDelete }) => {

    const DataFormat = (data) => {
      const dataFormatada = new Date(data);
      return dataFormatada.toLocaleDateString('pt-BR'); 
    };

    const deleteClient = (client) => {
      const updatedClients = clients.filter((c) => c.id !== client.id);
      onDelete(updatedClients); 
    };

    const [showModal, setShowModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
  
    const handleShow = (client) => {
      setSelectedClient(client);
      setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

  return (
    <div>
      <h2 className="mt-4 mb-3 text-center">Lista de Clientes</h2>
      <table className="table text-center">
        <thead className="thead-dark">
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
                <button className="btn btn-warning" onClick={() => handleShow(client)}>Detalhes</button>
                <button className="btn btn-danger ms-2" onClick={() => deleteClient(client)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal className="h-75 mt-5 bg-transparent rounded" show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Detalhes do Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedClient && (
            <ul>
              <li>ID: {selectedClient.id}</li>
              <li>Nome Completo: {selectedClient.firstname} {selectedClient.lastname}</li>
              <li>Data de Nascimento: {selectedClient.birthday}</li>
              <li>Email: {selectedClient.email}</li>
              <li>Data de nascimento: {DataFormat(selectedClient.birthday)}</li>
              <li>Telefone: {selectedClient.phone}</li>
              <li>Endereço: {selectedClient.address.street}</li>
              <li>
              <h5 className="mt-1">Cartões:</h5>
              </li>
              {cardsCredits.map((card, index) => (
                <ul key={index}> 
                  <li>{card.type}</li>
                </ul>
              ))}  
            </ul>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}> Fechar </Button>
          <GeneratePDF/>
        </Modal.Footer>
      </Modal>

      {showModal && (
        <div className="modal-backdrop fade show"></div>
      )}
    </div>
  );
};

export default ClientsList;