import React, { useState, useEffect } from 'react';
import getJobs from '../../services/api'; // Importando o serviço de getJobs diretamente
import './joblist.css'

const JobList = () => {
  const [jobs, setJobs] = useState([]);  // Estado para armazenar as vagas
  const [loading, setLoading] = useState(true);  // Estado para controlar o carregamento
  const [error, setError] = useState(null);  // Estado para capturar erros de requisição
  const [count, setCount] = useState(15);  // Estado para o parâmetro de quantidade de vagas
  const [geo, setGeo] = useState('canada'); // Estado para o parâmetro de região geográfica

  useEffect(() => {
    // Usando o serviço para buscar as vagas com os parâmetros count e geo
    getJobs(count, geo)  // Chama diretamente a função getJobs
      .then((data) => {
        setJobs(data);  // Atualiza o estado com os dados das vagas
        setLoading(false); // Finaliza o carregamento
      })
      .catch((error) => {
        setError('Erro ao carregar as vagas: ' + (error.message || 'Desconhecido'));
        setLoading(false); // Finaliza o carregamento em caso de erro
      });
  }, [count, geo]);  // Dependências para que a requisição seja feita quando count ou geo mudar

  // Exibindo uma mensagem enquanto as vagas estão sendo carregadas
  if (loading) {
    return <p>Carregando vagas...</p>;
  }

  // Exibindo uma mensagem caso ocorra um erro
  if (error) {
    return <p>{error}</p>;
  }

  // Exibindo as vagas ou uma mensagem caso não haja vagas
  return (
    <div className="job-list">
      {/* Título das vagas remotas */}
      <h1>Vagas Remotas</h1>

      {/* Exibindo as vagas */}
      {jobs.length === 0 ? (
        <p>Nenhuma vaga encontrada.</p>
      ) : (
        jobs.map((job, index) => (
          <div key={index} className="job-card">
            <h3>{job.jobTitle}</h3>
            <p>{job.companyName}</p>
            <p>{job.jobGeo}</p>
            {job.companyLogo && <img src={job.companyLogo} alt={job.companyName} />}
            <p>{job.jobExcerpt}</p>

              {/* Exibindo o nível do trabalho */}
              {job.jobLevel ? (
              <p><strong>Nível do Trabalho:</strong> {job.jobLevel}</p>
            ) : (
              <p><strong>Nível do Trabalho:</strong> Não especificado</p>
            )}

             {/* Exibindo os salários */}
             {job.annualSalaryMin && job.annualSalaryMax ? (
              <p>
                Salário: {job.annualSalaryMin} - {job.annualSalaryMax} {job.salaryCurrency}
              </p>
            ) : (
              <p>Salário não especificado</p>
            )}

            <a href={job.url} target="_blank" rel="noopener noreferrer">Ver mais detalhes</a>
          </div>
        ))
      )}
    </div>
  );
};

export default JobList;
