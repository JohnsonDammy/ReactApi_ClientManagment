import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ClientForm.css'; // Create this file for custom styles

function ClientList() {
  const [clients, setClients] = useState([]);

  const fetchClients = () => {
    fetch('https://localhost:44319/api/clients')
      .then(response => response.json())
      .then(data => setClients(data))
      .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="container mt-4 client-list">
      <h2>Client List</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Details</th>
            <th>Addresses</th>
            <th>Contacts</th>
          </tr>
        </thead>
        <tbody>
          {clients?.map(client => (
            <tr key={client.Id}>
              <td>{client.Id}</td>
              <td>{client.Name}</td>
              <td>{client.Gender}</td>
              <td>{client.Details}</td>
              <td>
                {client.Addresses?.map((addr, index) => (
                  <div key={index}>
                    <strong>{addr.AddressType}:</strong> {addr.AddressLine}
                  </div>
                ))}
              </td>
              <td>
                {client.Contacts?.map((contact, index) => (
                  <div key={index}>
                    <strong>{contact.ContactType}:</strong> {contact.ContactNumber}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientList;
