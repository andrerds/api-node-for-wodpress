const axios = require('axios');
require('dotenv').config();

const getPlanos = async (req, res) => {
  const { page = 1, per_page = 10 } = req.query;
  
  try {
    console.log('Fetching data from:', process.env.API_URL);
    
    const response = await axios.get(process.env.API_URL, {
      params: {
        per_page: 99
      }
    });

    console.log('Data fetched successfully:', response.data.length);

    const data = response.data.map(plano => ({
      id: plano.id,
      modified: plano.modified,
      modified_gmt: plano.modified_gmt,
      slug: plano.slug,
      titulo: plano.title.rendered,
      tipo: plano.tipo,
      conteudo: plano.conteudo.rendered,
      entidades: plano.entidades,
      clientes_info: plano.clientes_info,
      downloads: plano.downloads,
      redecredenciada: plano.redecredenciada,
      imagemtabela: plano.imagemtabela.guid,
      coparticipacao: plano.coparticipacao,
      publico_alvo: plano.publico_alvo,
    }));

    const start = (page - 1) * per_page;
    const end = start + per_page;
    const paginatedData = data.slice(start, end);

    res.json({
      page,
      per_page,
      total: data.length,
      total_pages: Math.ceil(data.length / per_page),
      data: paginatedData
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data from the external API' });
  }
};

module.exports = {
  getPlanos,
};
