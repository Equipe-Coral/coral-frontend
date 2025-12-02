import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { MdSearch, MdClose, MdCategory, MdHourglassEmpty } from 'react-icons/md';
import HeaderWhite from '../components/HeaderWhite';
import WideDiscussionCard from '../components/WideDiscussionCard';
import api from '../services/api';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #FAF9F8;
  padding-bottom: 4rem;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const HeaderSection = styled.div`
  margin-bottom: 1rem;
`;

const PageTitle = styled.h1`
  font-family: var(--font-title);
  font-size: 2rem;
  color: var(--text);
  margin-bottom: 0.5rem;
`;

const PageSubtitle = styled.p`
  color: var(--text-light);
  font-size: 1.1rem;
`;

const FilterCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FilterRow = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text);
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 1rem;
  color: #F27D70;
  font-size: 1.2rem;
  pointer-events: none;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid #E0E0E0;
  border-radius: 25px;
  font-size: 0.95rem;
  background: #FFF5F2;
  color: var(--text);
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: var(--primary);
  }

  &::placeholder {
    color: #999;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid #E0E0E0;
  border-radius: 25px;
  font-size: 0.95rem;
  background: #FFF5F2;
  color: var(--text);
  outline: none;
  cursor: pointer;
  appearance: none;
  
  &:focus {
    border-color: var(--primary);
  }
`;

const SearchButton = styled.button`
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 25px;
  padding: 0.75rem 2rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.2s;

  &:hover {
    background: var(--primary-hover);
  }
`;

const ClearButton = styled.button`
  background: transparent;
  color: #666;
  border: 1px solid #E0E0E0;
  border-radius: 25px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background: #f5f5f5;
    color: #333;
    border-color: #ccc;
  }
`;

// Mapeia status livre em filtro simples (opcional). A API não possui campo "categoria"; usamos apenas palavra-chave.
// Categoria temática: mapeia palavras-chave por área para melhorar identificação
const CATEGORY_KEYWORDS = {
  'Segurança': ['segurança', 'seguranca', 'polícia', 'policia', 'crime', 'criminal', 'violência', 'violencia', 'penal', 'prisão', 'prisao', 'carcerária', 'carceraria', 'armas', 'militar', 'pm', 'delegacia'],
  'Saúde': ['saúde', 'saude', 'sus', 'hospital', 'clínica', 'clinica', 'medicamento', 'vacina', 'enfermagem', 'médico', 'medico', 'saúde mental', 'saude mental'],
  'Educação': ['educação', 'educacao', 'escola', 'professor', 'ensino', 'universidade', 'aluno', 'merenda', 'creche'],
  'Transporte': ['transporte', 'trânsito', 'transito', 'mobilidade', 'rodovia', 'metrô', 'metro', 'ônibus', 'onibus'],
  'Meio Ambiente': ['ambiente', 'meio ambiente', 'floresta', 'desmatamento', 'carbono', 'clima', 'reciclagem', 'lixo', 'saneamento'],
  'Economia': ['economia', 'tributo', 'imposto', 'fiscal', 'orçamento', 'orcamento', 'crescimento', 'finanças', 'financas'],
  'Direitos Humanos': ['direitos humanos', 'igualdade', 'discriminação', 'discriminacao', 'minorias', 'inclusão', 'inclusao'],
  'Tecnologia': ['tecnologia', 'digital', 'dados', 'privacidade', 'lgpd', 'internet', 'cibersegurança', 'ciberseguranca', 'ia', 'inteligência artificial', 'inteligencia artificial'],
};

const ExploreDiscussions = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedStatus('');
    setPage(1);
  };

  async function loadDiscussions(params = {}) {
    setLoading(true);
    setError('');
    try {
      const keywords = (searchTerm || '').trim();
      const resp = await api.camaraRequest('/proposicoes', {
        keywords,
        siglaTipo: 'PL',
        ordenarPor: 'id',
        ordem: 'DESC',
        itens: pageSize,
        pagina: page,
      });
      const dados = Array.isArray(resp?.dados) ? resp.dados : [];
      const mapped = dados.map(p => ({
        id: p.id,
        title: `${p.siglaTipo} ${p.numero}/${p.ano} - ${p.ementa}`,
        description: p.ementaDetalhada || p.ementa || '',
        author: p.autores && p.autores.length ? p.autores[0].nome : 'Autor não informado',
        organ: 'Câmara dos Deputados',
        category: selectedCategory || '',
        status: p.statusProposicao?.descricaoSituacao || p.statusProposicao?.sigla || 'Em tramitação',
      }));
      // Aplicar filtros mais corretos no cliente
      const norm = (s) => (s || '').toString().toLowerCase();
      const filtered = mapped.filter(item => {
        let ok = true;
        // Filtro por categoria temática com palavras-chave configuradas
        if (selectedCategory) {
          const text = norm(item.title) + ' ' + norm(item.description);
          const keywords = CATEGORY_KEYWORDS[selectedCategory] || [selectedCategory.toLowerCase()];
          ok = ok && keywords.some(k => text.includes(k));
        }
        // Filtro por status: "Em tramitação" vs "Aprovado" (usa descricaoSituacao)
        if (selectedStatus === 'Em tramitação') {
          ok = ok && norm(item.status).includes('tramita');
        } else if (selectedStatus === 'Aprovado') {
          ok = ok && norm(item.status).includes('aprov');
        }
        return ok;
      });
      setItems(filtered);
      const totalCount = Number(resp?.headers?.['x-total-count']) || Number(resp?.total) || 0;
      setTotal(totalCount);
    } catch (e) {
      setError('Erro ao carregar discussões.');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDiscussions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  const handleSearch = () => {
    setPage(1);
    loadDiscussions();
  };

  return (
    <PageContainer>
      <HeaderWhite />
      <ContentWrapper>
        <HeaderSection>
          <PageTitle>Explorar Discussões Públicas</PageTitle>
          <PageSubtitle>Acompanhe leis, projetos e pautas em andamento.</PageSubtitle>
        </HeaderSection>

        <FilterCard>
          <FilterRow>
            <FilterGroup>
              <Label>Palavra-chave</Label>
              <InputWrapper>
                <IconWrapper><MdSearch /></IconWrapper>
                <Input 
                  placeholder="Buscar por título ou nº" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputWrapper>
            </FilterGroup>

            <FilterGroup>
              <Label>Categoria</Label>
              <InputWrapper>
                <IconWrapper><MdCategory /></IconWrapper>
                <Select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Todas as categorias</option>
                  <option value="Segurança">Segurança</option>
                  <option value="Saúde">Saúde</option>
                  <option value="Educação">Educação</option>
                  <option value="Transporte">Transporte</option>
                  <option value="Meio Ambiente">Meio Ambiente</option>
                  <option value="Economia">Economia</option>
                  <option value="Direitos Humanos">Direitos Humanos</option>
                  <option value="Tecnologia">Tecnologia</option>
                </Select>
              </InputWrapper>
            </FilterGroup>

            <FilterGroup>
              <Label>Status</Label>
              <InputWrapper>
                <IconWrapper><MdHourglassEmpty /></IconWrapper>
                <Select 
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="">Todos os status</option>
                  <option value="Em tramitação">Em tramitação</option>
                  <option value="Aprovado">Aprovado</option>
                </Select>
              </InputWrapper>
            </FilterGroup>

            <SearchButton onClick={handleSearch}>
              Buscar
              <MdSearch size={20} />
            </SearchButton>
            <ClearButton onClick={handleClearFilters}>
              Limpar
              <MdClose size={20} />
            </ClearButton>
          </FilterRow>
        </FilterCard>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {loading && (
            <p style={{ textAlign: 'center', color: '#666', marginTop: '1rem' }}>
              Carregando discussões...
            </p>
          )}
          {!loading && items.map((discussion) => (
            <WideDiscussionCard
              key={discussion.id}
              {...discussion}
              onClick={() => navigate(`/discussion/${discussion.id}`)}
            />
          ))}
          {!loading && items.length === 0 && (
            <p style={{ textAlign: 'center', color: '#666', marginTop: '2rem' }}>
              Nenhuma discussão encontrada.
            </p>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              disabled={page <= 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
              style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #E0E0E0', background: '#FFF' }}
            >
              Anterior
            </button>
            <button
              disabled={items.length < pageSize}
              onClick={() => setPage(p => p + 1)}
              style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #E0E0E0', background: '#FFF' }}
            >
              Próxima
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#666', fontSize: '0.9rem' }}>Itens por página:</span>
            <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} style={{ padding: '0.4rem 0.6rem', borderRadius: '8px', border: '1px solid #E0E0E0' }}>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </ContentWrapper>
    </PageContainer>
  );
};

export default ExploreDiscussions;
