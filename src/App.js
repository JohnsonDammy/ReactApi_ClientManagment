import React from 'react';
import ClientForm from './ClientForm';
import ClientList from './ClientList';
import ExportButton from './ExportButton';
import ExportExcelButton from './ExportExcelButton';

function App() {
  return (
    <div>
      <center><h1>Client Management System</h1></center>
      <ClientForm />
      <ClientList />
      <ExportButton />
      <ExportExcelButton />

    </div>
  );
}

export default App;
