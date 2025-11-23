import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { MdSearch, MdLocationOn, MdCategory, MdHourglassEmpty, MdShield, MdEco, MdFavorite, MdAttachMoney, MdClose } from 'react-icons/md';
import { FaRoad } from "react-icons/fa";
import HeaderWhite from '../components/HeaderWhite';
import WideDemandCard from '../components/WideDemandCard';

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

const COLORS = {
  security: { icon: '#D89F66', bg: '#F5E6D3' },
  infrastructure: { icon: '#44a1adff', bg: '#E0F7FA' },
  environment: { icon: '#66BB6A', bg: '#E8F5E9' },
  health: { icon: '#42A5F5', bg: '#E3F2FD' },
  economy: { icon: '#8D6E63', bg: '#EFEBE9' }
};

const FAKE_DEMANDS = [
  {
    id: 1,
    icon: <MdShield />,
    title: 'Programa Municipal de Iluminação Segura',
    description: 'Garantir segurança e uso comunitário de espaços públicos através da modernização da iluminação urbana.',
    location: 'Rua Fictícia, 123 - Pinheiros, São Paulo - SP',
    supports: 125,
    status: 'Em Análise',
    category: 'Segurança',
    categoryColors: COLORS.security,
  },
  {
    id: 2,
    icon: <FaRoad />,
    title: 'Pavimentação da Rua das Flores',
    description: 'Melhoria da infraestrutura viária para facilitar o acesso e reduzir acidentes.',
    location: 'Rua das Flores, 45 - Centro, Curitiba - PR',
    supports: 89,
    status: 'Aprovado',
    category: 'Infraestrutura',
    categoryColors: COLORS.infrastructure,
  },
  {
    id: 3,
    icon: <MdEco />,
    title: 'Revitalização do Parque Central',
    description: 'Recuperação da área verde e instalação de novos equipamentos de lazer.',
    location: 'Av. Principal, 1000 - Centro, Manaus - AM',
    supports: 230,
    status: 'Em Análise',
    category: 'Meio Ambiente',
    categoryColors: COLORS.environment,
  },
  {
    id: 4,
    icon: <MdFavorite />,
    title: 'Ampliação do Posto de Saúde',
    description: 'Construção de nova ala para atendimento pediátrico e geriátrico.',
    location: 'Rua da Saúde, 88 - Barra, Salvador - BA',
    supports: 150,
    status: 'Aprovado',
    category: 'Saúde',
    categoryColors: COLORS.health,
  },
  {
    id: 5,
    icon: <MdAttachMoney />,
    title: 'Feira de Produtores Locais',
    description: 'Incentivo à economia local com espaço fixo para feirantes e artesãos.',
    location: 'Praça do Comércio, 12 - Copacabana, Rio de Janeiro - RJ',
    supports: 75,
    status: 'Em Análise',
    category: 'Economia',
    categoryColors: COLORS.economy,
  }
];

const ExploreDemands = () => {
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching cities:', error);
        setLoading(false);
      });
  }, []);

  const filteredDemands = FAKE_DEMANDS.filter(demand => {
    const matchesSearch = demand.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          demand.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity ? demand.location.includes(cities.find(c => c.id === parseInt(selectedCity))?.name || '') : true;
    const matchesCategory = selectedCategory ? demand.category.toLowerCase() === selectedCategory.toLowerCase() : true;
    const matchesStatus = selectedStatus ? demand.status.toLowerCase() === selectedStatus.toLowerCase() : true;

    return matchesSearch && matchesCity && matchesCategory && matchesStatus;
  });

  return (
    <PageContainer>
      <HeaderWhite />
      <ContentWrapper>
        <HeaderSection>
          <PageTitle>Explorar Demandas</PageTitle>
          <PageSubtitle>Encontre, filtre e acompanhe as demandas da sua comunidade.</PageSubtitle>
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

            <SearchButton>
              Buscar
              <MdSearch size={20} />
            </SearchButton>
          </FilterRow>
        </FilterCard>

        <div>
          {filteredDemands.map((demand) => (
            <WideDemandCard
              key={demand.id}
              {...demand}
              onClick={() => navigate(`/demand/${demand.id}`)}
            />
          ))}
          {filteredDemands.length === 0 && (
            <p style={{ textAlign: 'center', color: '#666', marginTop: '2rem' }}>
              Nenhuma demanda encontrada com os filtros selecionados.
            </p>
          )}
        </div>
      </ContentWrapper>
    </PageContainer>
  );
};

export default ExploreDemands;
