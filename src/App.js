import React from 'react';
import JobList from './components/JobList/JobList'; // Importa o componente JobList

function App() {
  return (
    <div className="App">
      <JobList /> {/* Exibe a lista de vagas remotas */}
    </div>
  );
}

export default App; // Exporta o componente App
