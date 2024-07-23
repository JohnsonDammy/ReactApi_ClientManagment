import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ClientForm.css'; // Create this file for custom styles

function ClientForm() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [details, setDetails] = useState('');
  const [addresses, setAddresses] = useState([{ addressType: '', addressLine: '' }]);
  const [contacts, setContacts] = useState([{ contactType: '', contactNumber: '' }]);
  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState('');

  useEffect(() => {
    fetch('https://localhost:44319/api/clients')
      .then(response => response.json())
      .then(data => setClients(data))
      .catch(error => console.error('Error fetching clients:', error));
  }, []);

  const handleSubmit = async (event) => {

    try {
      const response = await fetch('https://localhost:44319/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Name: name, Gender: gender, Details: details })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const client = await response.json();
      setClients(prevClients => [...prevClients, client]);
      setSelectedClientId(client.Id);
      setName('');
      setGender('');
      setDetails('');
      setAddresses([{ addressType: '', addressLine: '' }]);
      setContacts([{ contactType: '', contactNumber: '' }]);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddressSubmit = async () => {
    if (!selectedClientId) return;

    try {
      for (const addr of addresses) {
        await fetch(`https://localhost:44319/api/clients/${selectedClientId}/addresses`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(addr)
        });
      }
      setAddresses([{ addressType: '', addressLine: '' }]);
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleContactSubmit = async () => {
    if (!selectedClientId) return;

    try {
      for (const contact of contacts) {
        await fetch(`https://localhost:44319/api/clients/${selectedClientId}/contacts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(contact)
        });
      }
      setContacts([{ contactType: '', contactNumber: '' }]);
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddressChange = (index, field, value) => {
    const newAddresses = [...addresses];
    newAddresses[index][field] = value;
    setAddresses(newAddresses);
  };

  const handleContactChange = (index, field, value) => {
    const newContacts = [...contacts];
    newContacts[index][field] = value;
    setContacts(newContacts);
  };

  const addAddress = () => {
    setAddresses([...addresses, { addressType: '', addressLine: '' }]);
  };

  const addContact = () => {
    setContacts([...contacts, { contactType: '', contactNumber: '' }]);
  };

  return (
    <div className="container mt-4 client-form">
      <h2 className="mb-4">Client Management System</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter client name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <input
            type="text"
            className="form-control"
            id="gender"
            value={gender}
            onChange={e => setGender(e.target.value)}
            placeholder="Enter client gender"
          />
        </div>
        <div className="form-group">
          <label htmlFor="details">Details</label>
          <textarea
            className="form-control"
            id="details"
            value={details}
            onChange={e => setDetails(e.target.value)}
            placeholder="Enter additional details"
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Client</button>
      </form>

      <div className="mt-4">
        <h3>Select Client and Add Address/Contact</h3>
        <div className="form-group">
          <label htmlFor="clientSelect">Select Client</label>
          <select
            id="clientSelect"
            className="drop"
            value={selectedClientId}
            onChange={e => setSelectedClientId(e.target.value)}
          >
            <option value="">Select Client<br></br> <br></br></option>
            {clients.map(client => (
              <option key={client.Id} value={client.Id}>{client.Name}</option>
            ))}
          </select>
        </div>
        {selectedClientId && (
          <div>
            <h4 className="mt-4">Add Address</h4>
            {addresses.map((addr, index) => (
              <div key={index} className="form-group">
                <label htmlFor={`addressType${index}`}>Address Type</label>
                <input
                  type="text"
                  className="form-control"
                  id={`addressType${index}`}
                  value={addr.addressType}
                  onChange={e => handleAddressChange(index, 'addressType', e.target.value)}
                  placeholder="Address Type"
                />
                <label htmlFor={`addressLine${index}`}>Address Line</label>
                <input
                  type="text"
                  className="form-control"
                  id={`addressLine${index}`}
                  value={addr.addressLine}
                  onChange={e => handleAddressChange(index, 'addressLine', e.target.value)}
                  placeholder="Address Line"
                />
              </div>
            ))}
            <button type="button" className="btn btn-secondary" onClick={addAddress}>Add Another Address</button>
            <button type="button" className="btn btn-primary mt-2" onClick={handleAddressSubmit}>Submit Addresses</button>
          </div>
        )}

        {selectedClientId && (
          <div className="mt-4">
            <h4>Add Contact</h4>
            {contacts.map((contact, index) => (
              <div key={index} className="form-group">
                <label htmlFor={`contactType${index}`}>Contact Type</label>
                <input
                  type="text"
                  className="form-control"
                  id={`contactType${index}`}
                  value={contact.contactType}
                  onChange={e => handleContactChange(index, 'contactType', e.target.value)}
                  placeholder="Contact Type"
                />
                <label htmlFor={`contactNumber${index}`}>Contact Number</label>
                <input
                  type="text"
                  className="form-control"
                  id={`contactNumber${index}`}
                  value={contact.contactNumber}
                  onChange={e => handleContactChange(index, 'contactNumber', e.target.value)}
                  placeholder="Contact Number"
                />
              </div>
            ))}
            <button type="button" className="btn btn-secondary" onClick={addContact}>Add Another Contact</button>
            <button type="button" className="btn btn-primary mt-2" onClick={handleContactSubmit}>Submit Contacts</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientForm;
