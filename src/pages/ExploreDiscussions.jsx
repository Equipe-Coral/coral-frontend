import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { MdSearch, MdClose, MdCategory, MdHourglassEmpty } from 'react-icons/md';
import HeaderWhite from '../components/HeaderWhite';
import WideDiscussionCard from '../components/WideDiscussionCard';

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

const FAKE_DISCUSSIONS = [
  {
    id: 1,
    title: 'PL 1234/2024 - Institui o Programa de Hortas Urbanas Comunitárias',
    description: 'Garantir segurança e uso comunitário de espaços públicos através da modernização da iluminação urbana.',
    author: 'Dep. João Silva',
    organ: 'Câmara Municipal de São Paulo',
    category: 'Segurança',
    status: 'Em tramitação'
  },
  {
    id: 2,
    title: 'PL 1234/2024 - Institui o Programa de Hortas Urbanas Comunitárias',
    description: 'Garantir segurança e uso comunitário de espaços públicos através da modernização da iluminação urbana.',
    author: 'Dep. João Silva',
    organ: 'Câmara Municipal de São Paulo',
    category: 'Segurança',
    status: 'Aprovado'
  },
  {
    id: 3,
    title: 'PL 1234/2024 - Institui o Programa de Hortas Urbanas Comunitárias',
    description: 'Garantir segurança e uso comunitário de espaços públicos através da modernização da iluminação urbana.',
    author: 'Dep. João Silva',
    organ: 'Câmara Municipal de São Paulo',
    category: 'Segurança',
    status: 'Em tramitação'
  },
  {
    id: 4,
    title: 'PL 1234/2024 - Institui o Programa de Hortas Urbanas Comunitárias',
    description: 'Garantir segurança e uso comunitário de espaços públicos através da modernização da iluminação urbana.',
    author: 'Dep. João Silva',
    organ: 'Câmara Municipal de São Paulo',
    category: 'Segurança',
    status: 'Em tramitação'
  },
  {
    id: 5,
    title: 'PL 1234/2024 - Institui o Programa de Hortas Urbanas Comunitárias',
    description: 'Garantir segurança e uso comunitário de espaços públicos através da modernização da iluminação urbana.',
    author: 'Dep. João Silva',
    organ: 'Câmara Municipal de São Paulo',
    category: 'Segurança',
    status: 'Em tramitação'
  }
];

const ExploreDiscussions = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedStatus('');
  };

  const filteredDiscussions = FAKE_DISCUSSIONS.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          discussion.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? discussion.category === selectedCategory : true;
    const matchesStatus = selectedStatus ? discussion.status === selectedStatus : true;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

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

            <SearchButton>
              Buscar
              <MdSearch size={20} />
            </SearchButton>
          </FilterRow>
        </FilterCard>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredDiscussions.map((discussion) => (
            <WideDiscussionCard
              key={discussion.id}
              {...discussion}
              onClick={() => navigate(`/discussion/${discussion.id}`)}
            />
          ))}
          {filteredDiscussions.length === 0 && (
            <p style={{ textAlign: 'center', color: '#666', marginTop: '2rem' }}>
              Nenhuma discussão encontrada.
            </p>
          )}
        </div>
      </ContentWrapper>
    </PageContainer>
  );
};

export default ExploreDiscussions;
