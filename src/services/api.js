import axios from 'axios';

// Função para buscar vagas da API com parâmetros de consulta
const getJobs = async (count = 15, geo = 'canada') => {
  try {
    // Fazendo a requisição GET para a API com os parâmetros count e geo
    const response = await axios.get('https://jobicy.com/api/v2/remote-jobs', {
      params: {
        count: count,    // Quantidade de vagas
        geo: geo,        // Região geográfica (por exemplo, 'canada')
      }
    });
    
    // Log para verificar os dados recebidos
    console.log('Vagas recebidas:', response.data);
    
    return response.data.jobs || [];  // Retorna as vagas ou um array vazio caso não haja
  } catch (error) {
    console.error('Erro ao buscar vagas:', error.response || error.message || error);
    throw error;  // Lança o erro para ser tratado no componente
  }
};

export default getJobs;
