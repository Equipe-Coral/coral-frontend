import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { MdSearch, MdLocationOn, MdCategory, MdHourglassEmpty, MdShield, MdEco, MdFavorite, MdAttachMoney, MdClose, MdAutoAwesome } from 'react-icons/md';
import { FaRoad } from "react-icons/fa";
import HeaderWhite from '../components/HeaderWhite';
import WideDemandCard from '../components/WideDemandCard';
import api from '../services/api';
import Modal from '../components/Modal';

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
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
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

const AddDemandButton = styled.button`
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 25px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover { background: var(--primary-hover); }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #E0E0E0;
  border-radius: 16px;
  font-size: 0.95rem;
  background: #FFF5F2;
  color: var(--text);
  outline: none;
  min-height: 120px;
  resize: vertical;
`;

const ModalTitle = styled.h2`
  font-family: var(--font-title);
  font-size: 1.5rem;
  color: var(--text);
  margin: 0 0 1.5rem 0;
`;

const ModalFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

const SecondaryButton = styled.button`
  background: transparent;
  color: #666;
  border: 1px solid #E0E0E0;
  border-radius: 12px;
  padding: 0.6rem 1rem;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
`;

const AIButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.6rem 1rem;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: opacity 0.2s, transform 0.2s;

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled.button`
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.6rem 1rem;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding: 1rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const PageSizeSelector = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const PageSizeLabel = styled.span`
  color: #666;
  font-size: 0.9rem;
  font-weight: 500;
`;

const PageSizeSelect = styled.select`
  padding: 0.5rem 0.75rem;
  border-radius: 25px;
  border: 1px solid #E0E0E0;
  background: #FFF5F2;
  color: var(--text);
  font-size: 0.9rem;
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: var(--primary);
  }
`;

const PageNavigationContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

const PageButton = styled.button`
  padding: 0.6rem 1.25rem;
  border-radius: 25px;
  border: 1px solid #E0E0E0;
  background: ${props => props.disabled ? '#f5f5f5' : 'white'};
  color: ${props => props.disabled ? '#999' : 'var(--text)'};
  font-weight: 600;
  font-size: 0.9rem;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: var(--primary);
    color: white;
    border-color: var(--primary);
  }
`;

const PageInfo = styled.span`
  color: #666;
  font-weight: 500;
  font-size: 0.95rem;
  min-width: 120px;
  text-align: center;
`;

const COLORS = {
  security: { icon: '#D89F66', bg: '#F5E6D3' },
  infrastructure: { icon: '#44a1adff', bg: '#E0F7FA' },
  environment: { icon: '#66BB6A', bg: '#E8F5E9' },
  health: { icon: '#42A5F5', bg: '#E3F2FD' },
  economy: { icon: '#8D6E63', bg: '#EFEBE9' }
};

// Demands fetched via API

const ExploreDemands = () => {
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState('');
  const [demands, setDemands] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [createData, setCreateData] = useState({
    title: '',
    description: '',
    location: '',
    category: '',
    status: 'Em Análise',
  });
  const [creating, setCreating] = useState(false);
  const [formalizing, setFormalizing] = useState(false);
  const [createdDemandId, setCreatedDemandId] = useState(null);
  const [formalizingAI, setFormalizingAI] = useState(false);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCity('');
    setSelectedCategory('');
    setSelectedStatus('');
  };

  useEffect(() => {
    setLoading(true);
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome')
      .then(response => response.json())
      .then(data => {
        const formattedCities = data.map(city => ({
          id: city.id,
          name: city.nome,
          state: city.microrregiao?.mesorregiao?.UF?.sigla || city['regiao-imediata']?.['regiao-intermediaria']?.UF?.sigla || ''
        }));
        setCities(formattedCities);
        // After cities, fetch demands
        return api.listDemands();
      })
      .then(data => {
        const items = data.items || data;
        setDemands(items);
        if (data.total) setTotal(data.total);
        if (data.page) setPage(data.page);
        if (data.pageSize) setPageSize(data.pageSize);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao carregar dados:', error);
        setError('Erro ao carregar dados.');
        setLoading(false);
      });
  }, []);

  const filteredDemands = demands.filter(demand => {
    const title = demand.title || '';
    const description = demand.description || '';
    const location = demand.location || '';
    const category = (demand.category || '').toLowerCase();
    const status = (demand.status || '').toLowerCase();

    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity ? location.includes(cities.find(c => c.id === parseInt(selectedCity))?.name || '') : true;
    const matchesCategory = selectedCategory ? category === selectedCategory.toLowerCase() : true;
    const matchesStatus = selectedStatus ? status === selectedStatus.toLowerCase() : true;

    return matchesSearch && matchesCity && matchesCategory && matchesStatus;
  });

  const handlePageSizeChange = async (newSize) => {
    setPageSize(newSize);
    setPage(1);
    setLoading(true);
    try {
      const cityName = selectedCity ? cities.find(c => c.id === parseInt(selectedCity))?.name : undefined;
      const data = await api.listDemands({ 
        q: searchTerm || undefined, 
        city: cityName || undefined, 
        category: selectedCategory || undefined, 
        status: selectedStatus || undefined, 
        page: 1, 
        pageSize: newSize 
      });
      const items = data.items || data;
      setDemands(items);
      if (data.total) setTotal(data.total);
    } finally { 
      setLoading(false); 
    }
  };

  const handlePreviousPage = async () => {
    if (page <= 1) return;
    setLoading(true);
    try {
      const cityName = selectedCity ? cities.find(c => c.id === parseInt(selectedCity))?.name : undefined;
      const data = await api.listDemands({ 
        q: searchTerm || undefined, 
        city: cityName || undefined, 
        category: selectedCategory || undefined, 
        status: selectedStatus || undefined, 
        page: page - 1, 
        pageSize 
      });
      const items = data.items || data;
      setDemands(items);
      if (data.page) setPage(data.page); 
      else setPage(page - 1);
    } finally { 
      setLoading(false); 
    }
  };

  const handleNextPage = async () => {
    if (total && page >= Math.ceil(total / pageSize)) return;
    setLoading(true);
    try {
      const cityName = selectedCity ? cities.find(c => c.id === parseInt(selectedCity))?.name : undefined;
      const data = await api.listDemands({ 
        q: searchTerm || undefined, 
        city: cityName || undefined, 
        category: selectedCategory || undefined, 
        status: selectedStatus || undefined, 
        page: page + 1, 
        pageSize 
      });
      const items = data.items || data;
      setDemands(items);
      if (data.page) setPage(data.page); 
      else setPage(page + 1);
      if (data.total) setTotal(data.total);
    } finally { 
      setLoading(false); 
    }
  };

  const PaginationControls = () => (
    <PaginationContainer>
      <PageSizeSelector>
        <PageSizeLabel>Itens por página:</PageSizeLabel>
        <PageSizeSelect
          value={pageSize}
          onChange={(e) => handlePageSizeChange(parseInt(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </PageSizeSelect>
      </PageSizeSelector>
      <PageNavigationContainer>
        <PageButton
          disabled={page <= 1}
          onClick={handlePreviousPage}
        >
          Anterior
        </PageButton>
        <PageInfo>
          Página {page}{total ? ` de ${Math.ceil(total / pageSize)}` : ''}
        </PageInfo>
        <PageButton
          disabled={total ? page >= Math.ceil(total / pageSize) : false}
          onClick={handleNextPage}
        >
          Próxima
        </PageButton>
      </PageNavigationContainer>
    </PaginationContainer>
  );

  return (
    <PageContainer>
      <HeaderWhite />
      <ContentWrapper>
        <HeaderSection>
          <TitleGroup>
            <PageTitle>Explorar Demandas</PageTitle>
            <PageSubtitle>Encontre, filtre e acompanhe as demandas da sua comunidade.</PageSubtitle>
          </TitleGroup>
          <AddDemandButton onClick={() => setOpenCreateModal(true)}>+ Adicionar Demanda</AddDemandButton>
        </HeaderSection>

        <FilterCard>
          <FilterGroup>
            <Label>Tópico</Label>
            <InputWrapper>
              <IconWrapper><MdSearch /></IconWrapper>
              <Input 
                placeholder="Pesquise por leis, tópicos, programas..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputWrapper>
          </FilterGroup>

          <FilterRow>
            <FilterGroup>
              <Label>Bairro / Cidade / Estado</Label>
              <InputWrapper>
                <IconWrapper><MdLocationOn /></IconWrapper>
                <Select 
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  disabled={loading}
                >
                  <option value="">{loading ? 'Carregando cidades...' : 'Todas as cidades'}</option>
                  {cities.map(city => (
                    <option key={city.id} value={city.id}>
                      {city.name} - {city.state}
                    </option>
                  ))}
                </Select>
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
                  <option value="segurança">Segurança</option>
                  <option value="infraestrutura">Infraestrutura</option>
                  <option value="meio ambiente">Meio Ambiente</option>
                  <option value="saúde">Saúde</option>
                  <option value="economia">Economia</option>
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
                  <option value="em análise">Em Análise</option>
                  <option value="aprovado">Aprovado</option>
                </Select>
              </InputWrapper>
            </FilterGroup>

            <ClearButton onClick={handleClearFilters}>
              Limpar
              <MdClose size={20} />
            </ClearButton>

            <SearchButton onClick={async () => {
              setLoading(true);
              setError('');
              try {
                const cityName = selectedCity ? cities.find(c => c.id === parseInt(selectedCity))?.name : undefined;
                const data = await api.listDemands({
                  q: searchTerm || undefined,
                  city: cityName || undefined,
                  category: selectedCategory || undefined,
                  status: selectedStatus || undefined,
                  page,
                  pageSize,
                });
                const items = data.items || data;
                setDemands(items);
                if (data.total) setTotal(data.total);
                if (data.page) setPage(data.page);
                if (data.pageSize) setPageSize(data.pageSize);
              } catch (e) {
                setError('Erro ao buscar demandas.');
              } finally {
                setLoading(false);
              }
            }}>
              Buscar
              <MdSearch size={20} />
            </SearchButton>
          </FilterRow>
        </FilterCard>

        <div>
          {error && (
            <p style={{ textAlign: 'center', color: '#c00', marginTop: '1rem' }}>{error}</p>
          )}
          {filteredDemands.map((demand) => (
            <WideDemandCard
              key={demand.id}
              icon={demand.category === 'Segurança' ? <MdShield /> : demand.category === 'Infraestrutura' ? <FaRoad /> : undefined}
              title={demand.title}
              description={demand.description}
              location={demand.location}
              supports={demand.supports}
              status={demand.status}
              category={demand.category}
              categoryColors={COLORS[(demand.category || '').toLowerCase()]}
              onClick={() => navigate(`/demand/${demand.id}`)}
            />
          ))}
          {filteredDemands.length === 0 && (
            <p style={{ textAlign: 'center', color: '#666', marginTop: '2rem' }}>
              Nenhuma demanda encontrada com os filtros selecionados.
            </p>
          )}
        </div>

        <PaginationControls />
        <Modal open={openCreateModal} onClose={() => { setOpenCreateModal(false); setCreatedDemandId(null); }}>
          <ModalTitle>{createdDemandId ? 'Demanda criada' : 'Adicionar nova demanda'}</ModalTitle>
          {!createdDemandId && (
            <>
              <ModalFormGroup>
                <Label>Título</Label>
                <Input
                  style={{ paddingLeft: '1rem' }}
                  placeholder="Ex.: Iluminação pública no bairro X"
                  value={createData.title}
                  onChange={(e) => setCreateData({ ...createData, title: e.target.value })}
                />
              </ModalFormGroup>
              <ModalFormGroup>
                <Label>Descrição</Label>
                <TextArea
                  placeholder="Conte os detalhes do problema e por que isso importa"
                  value={createData.description}
                  onChange={(e) => setCreateData({ ...createData, description: e.target.value })}
                />
              </ModalFormGroup>
              <FormRow>
                <ModalFormGroup>
                  <Label>Localização</Label>
                  <Input
                    style={{ paddingLeft: '1rem' }}
                    placeholder="Rua/Bairro/Cidade - UF"
                    value={createData.location}
                    onChange={(e) => setCreateData({ ...createData, location: e.target.value })}
                  />
                </ModalFormGroup>
                <ModalFormGroup>
                  <Label>Categoria</Label>
                  <Select
                    style={{ paddingLeft: '1rem' }}
                    value={createData.category}
                    onChange={(e) => setCreateData({ ...createData, category: e.target.value })}
                  >
                    <option value="">Selecione</option>
                    <option value="Segurança">Segurança</option>
                    <option value="Infraestrutura">Infraestrutura</option>
                    <option value="Meio Ambiente">Meio Ambiente</option>
                    <option value="Saúde">Saúde</option>
                    <option value="Economia">Economia</option>
                  </Select>
                </ModalFormGroup>
              </FormRow>

              <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '0.5rem' }}>
                <AIButton
                  disabled={formalizingAI || !createData.title || !createData.description}
                  onClick={async () => {
                    setFormalizingAI(true);
                    setError('');
                    try {
                      const resp = await api.formalizeWithAI(createData);
                      const improved = resp.demand || resp;
                      setCreateData({
                        title: improved.title || createData.title,
                        description: improved.description || createData.description,
                        location: improved.location || createData.location,
                        category: improved.category || createData.category,
                        status: createData.status,
                      });
                    } catch (e) {
                      setError(e.message || 'Erro ao formalizar com IA');
                    } finally {
                      setFormalizingAI(false);
                    }
                  }}
                >
                  <MdAutoAwesome size={18} />
                  {formalizingAI ? 'Processando...' : 'Formalizar com IA'}
                </AIButton>
              </div>
            </>
          )}

          {createdDemandId && (
            <div style={{ background:'#FFF5F2', border:'1px solid #E0E0E0', borderRadius:12, padding:'0.75rem 1rem' }}>
              <p style={{ margin:0, color:'var(--text)' }}>Demanda criada com sucesso. ID: {createdDemandId}</p>
            </div>
          )}

          <ModalActions>
            <SecondaryButton onClick={() => { setOpenCreateModal(false); setCreatedDemandId(null); }}>Cancelar</SecondaryButton>
            {!createdDemandId ? (
              <PrimaryButton disabled={creating} onClick={async () => {
                setCreating(true);
                setError('');
                try {
                  const created = await api.createDemand(createData);
                  const id = created.id || created?.demand?.id;
                  setCreatedDemandId(id);
                  // refresh list quickly
                  const data = await api.listDemands({ page, pageSize });
                  setDemands(data.items || data);
                } catch (e) {
                  setError(e.message || 'Erro ao criar demanda');
                } finally {
                  setCreating(false);
                }
              }}>Criar</PrimaryButton>
            ) : (
              <PrimaryButton disabled={formalizing} onClick={async () => {
                setFormalizing(true);
                setError('');
                try {
                  const resp = await api.formalizeDemand(createdDemandId, { /* opcional: dados extras */ });
                  // Se backend retorna a demanda formalizada, atualiza campos locais
                  const updated = resp.demand || resp;
                  setCreateData({
                    title: updated.title || createData.title,
                    description: updated.description || createData.description,
                    location: updated.location || createData.location,
                    category: updated.category || createData.category,
                    status: updated.status || 'Em Análise',
                  });
                  // Atualiza lista
                  const data = await api.listDemands({ page, pageSize });
                  setDemands(data.items || data);
                } catch (e) {
                  setError(e.message || 'Erro ao formalizar demanda');
                } finally {
                  setFormalizing(false);
                }
              }}>Formalizar</PrimaryButton>
            )}
          </ModalActions>

          {error && (
            <p style={{ color:'#c00', marginTop:'0.75rem' }}>{error}</p>
          )}
        </Modal>
      </ContentWrapper>
    </PageContainer>
  );
};

export default ExploreDemands;
