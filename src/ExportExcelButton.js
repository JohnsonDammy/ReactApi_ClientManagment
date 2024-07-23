import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function ExportExcelButton() {
  const handleExport = () => {
    fetch('https://localhost:44319/api/clients/export-excel') // Updated endpoint
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'clients_with_addresses.xlsx';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url); // Clean up URL object
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to export data. Please try again.');
      });
  };

  return (
    <div className="container mt-4">
      <button onClick={handleExport} className="btn btn-info">
        Export Clients as Excel
      </button>
    </div>
  );
}

export default ExportExcelButton;
