const API_URL = 'http://localhost:8000/api';
const CAMARA_API_URL = 'https://dadosabertos.camara.leg.br/api/v2';

class ApiService {
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('authToken');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(`${API_URL}${endpoint}`, config);
      
      // Se o servidor não estiver respondendo
      if (!response) {
        throw new Error('Servidor não está respondendo');
      }

      const data = await response.json();

      // Se não autenticado, limpa token e redireciona
      if (response.status === 401) {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
        throw new Error('Sessão expirada. Faça login novamente.');
      }

      if (!response.ok) {
        throw new Error(data.message || 'Erro na requisição');
      }

      return data;
    } catch (error) {
      // Não loga erros de rede quando não há backend
      if (error.message.includes('fetch')) {
        console.warn('Backend não disponível:', endpoint);
      } else {
        console.error('API Error:', error);
      }
      throw error;
    }
  }

  // Autenticação
  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async verifyCode(email, code) {
    return this.request('/auth/verify', {
      method: 'POST',
      body: JSON.stringify({ email, code }),
    });
  }

  async resendCode(email) {
    return this.request('/auth/resend-code', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // Usuário
  async getProfile() {
    return this.request('/user/profile', {
      method: 'GET',
    });
  }

  async updateProfile(userData) {
    return this.request('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Demandas
  async listDemands(params = {}) {
    const query = new URLSearchParams(params).toString();
    const endpoint = '/demands' + (query ? `?${query}` : '');
    return this.request(endpoint, { method: 'GET' });
  }

  async getDemandById(id) {
    return this.request(`/demands/${id}`, { method: 'GET' });
  }

  async createDemand(payload) {
    return this.request('/demands', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async supportDemand(id) {
    return this.request(`/demands/${id}/support`, { method: 'POST' });
  }

  async unsupportDemand(id) {
    return this.request(`/demands/${id}/support`, { method: 'DELETE' });
  }

  async formalizeDemand(id, payload) {
    return this.request(`/demands/${id}/formalize`, {
      method: 'POST',
      body: JSON.stringify(payload || {}),
    });
  }

  async formalizeWithAI(payload) {
    return this.request('/demands/formalize-ai', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  // Discussões (Projetos de Lei)
  async listDiscussions(params = {}) {
    const query = new URLSearchParams(params).toString();
    const endpoint = '/discussions' + (query ? `?${query}` : '');
    return this.request(endpoint, { method: 'GET' });
  }

  async getDiscussionById(id) {
    return this.request(`/discussions/${id}`, { method: 'GET' });
  }

  async voteDiscussion(id, vote) {
    return this.request(`/discussions/${id}/vote`, {
      method: 'POST',
      body: JSON.stringify({ vote }), // 'sim' ou 'nao'
    });
  }

  // Comunidade (dados agregados)
  async getCommunityStats() {
    return this.request('/community/stats', { method: 'GET' });
  }

  async getCommunityDemands(params = {}) {
    const query = new URLSearchParams(params).toString();
    const endpoint = '/community/demands' + (query ? `?${query}` : '');
    return this.request(endpoint, { method: 'GET' });
  }

  // Câmara dos Deputados (via API oficial)
  async camaraRequest(path, params = {}) {
    // Filtrar parâmetros undefined ou null
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v != null)
    );
    const query = new URLSearchParams(cleanParams).toString();
    const url = `${CAMARA_API_URL}${path}${query ? `?${query}` : ''}`;
    const res = await fetch(url);
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || 'Erro na requisição à Câmara');
    }
    return res.json();
  }

  // Buscar proposições por palavra-chave (ementa/indexação)
  async searchPropositions({ keyword, dataInicio, dataFim, ordenarPor = 'id', ordem = 'DESC', tipo = 'PL' }) {
    // Mapeando para os parâmetros oficiais da API da Câmara
    return this.camaraRequest('/proposicoes', {
      keywords: keyword,
      dataApresentacaoInicio: dataInicio,
      dataApresentacaoFim: dataFim,
      ordenarPor,
      ordem,
      siglaTipo: tipo,
    });
  }

  // Obter proposição por ID
  async getPropositionById(id) {
    return this.camaraRequest(`/proposicoes/${id}`);
  }

  // Votações
  async listVotacoes({ dataInicio, dataFim, ordenarPor = 'dataHoraRegistro', ordem = 'DESC' }) {
    return this.camaraRequest('/votacoes', { dataInicio, dataFim, ordenarPor, ordem });
  }

  async getVotacaoById(id) {
    return this.camaraRequest(`/votacoes/${id}`);
  }

  async getVotacaoVotos(id) {
    return this.camaraRequest(`/votacoes/${id}/votos`);
  }

  async getVotacaoOrientacoes(id) {
    return this.camaraRequest(`/votacoes/${id}/orientacoes`);
  }
}

export default new ApiService();
