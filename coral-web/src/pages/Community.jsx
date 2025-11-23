import styled from 'styled-components';
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdMessage, MdSpatialAudioOff, MdGroups2, MdTrendingUp, MdInsertDriveFile, MdShield, MdEco, MdThumbsUpDown, MdFavorite, MdAttachMoney, MdLocationOn, MdNotificationsNone } from 'react-icons/md';
import { FaRoad } from "react-icons/fa";
import ActionCard from '../components/ActionCard';
import DemandCard from '../components/DemandCard';
import DiscussionCard from '../components/DiscussionCard';
import Map from '../components/Map';
import HeaderWhite from '../components/HeaderWhite';

// ==================== FAKE DATA ====================
const FAKE_USER = {
  name: 'Carol',
  location: 'São Paulo, SP'
};

const FAKE_STATS = {
  demandas: 14230,
  contribuicoes: 15667,
  comunidades: 1034
};

// Colors matching the design exactly with bg and icon separation
const COLORS = {
  security: { icon: '#D89F66', bg: '#F5E6D3' }, // Brown/Orange
  infrastructure: { icon: '#44a1adff', bg: '#E0F7FA' }, // Cyan/Purple
  environment: { icon: '#66BB6A', bg: '#E8F5E9' }, // Green
  health: { icon: '#42A5F5', bg: '#E3F2FD' }, // Blue
  economy: { icon: '#8D6E63', bg: '#EFEBE9' } // Brown
};

const CATEGORY_DEFINITIONS = [
  { id: 'Segurança', name: 'Segurança', icon: <MdShield />, colors: COLORS.security },
  { id: 'Infraestrutura', name: 'Infraestrutura', icon: <FaRoad />, colors: COLORS.infrastructure },
  { id: 'Meio Ambiente', name: 'Meio Ambiente', icon: <MdEco />, colors: COLORS.environment },
  { id: 'Saúde', name: 'Saúde', icon: <MdFavorite />, colors: COLORS.health },
  { id: 'Economia', name: 'Economia', icon: <MdAttachMoney />, colors: COLORS.economy }
];

const FAKE_DEMANDS = [
  {
    id: 1,
    icon: <MdShield />,
    title: 'Programa Municipal de Iluminação Segura da Praça do Cajueiro',
    description: 'Garantir segurança e uso comunitário de espaços públicos através da modernização da iluminação urbana.',
    status: 'enviado',
    category: 'Segurança',
    categoryColors: COLORS.security,
    coords: [-23.5505, -46.6333], // Centro
    city: 'São Paulo - SP',
    contributions: 156,
    engaged: 342
  },
  {
    id: 2,
    icon: <FaRoad />,
    title: 'Repavimentação da Avenida Principal',
    description: 'Melhoria das condições de tráfego e segurança viária com nova pavimentação e sinalização.',
    status: 'aberto',
    category: 'Infraestrutura',
    categoryColors: COLORS.infrastructure,
    coords: [-23.5615, -46.6559], // Paulista
    city: 'São Paulo - SP',
    contributions: 89,
    engaged: 210
  },
  {
    id: 3,
    icon: <MdEco />,
    title: 'Revitalização do Parque Central',
    description: 'Plantio de novas árvores, recuperação de áreas verdes e instalação de lixeiras ecológicas.',
    status: 'concluido',
    category: 'Meio Ambiente',
    categoryColors: COLORS.environment,
    coords: [-23.5614, -46.6960], // Pinheiros
    city: 'São Paulo - SP',
    contributions: 234,
    engaged: 567
  },
  {
    id: 4,
    icon: <MdShield />,
    title: 'Ronda Escolar',
    description: 'Aumento do policiamento no entorno das escolas municipais.',
    status: 'enviado',
    category: 'Segurança',
    categoryColors: COLORS.security,
    coords: [-23.5505, -46.6333], // Centro
    city: 'São Paulo - SP',
    contributions: 45,
    engaged: 120
  },
  {
    id: 5,
    icon: <MdFavorite />,
    title: 'Campanha de Vacinação',
    description: 'Ampliação dos horários de vacinação nos postos de saúde.',
    status: 'aberto',
    category: 'Saúde',
    categoryColors: COLORS.health,
    coords: [-23.5615, -46.6559], // Paulista
    city: 'São Paulo - SP',
    contributions: 320,
    engaged: 890
  },
  // Rio de Janeiro
  {
    id: 6,
    icon: <MdShield />,
    title: 'Segurança em Copacabana',
    description: 'Aumento do efetivo policial na orla durante a noite.',
    status: 'aberto',
    category: 'Segurança',
    categoryColors: COLORS.security,
    coords: [-22.9694, -43.1868],
    city: 'Rio de Janeiro - RJ',
    contributions: 567,
    engaged: 1200
  },
  {
    id: 7,
    icon: <MdEco />,
    title: 'Limpeza da Lagoa Rodrigo de Freitas',
    description: 'Mutirão de limpeza e instalação de novas lixeiras.',
    status: 'enviado',
    category: 'Meio Ambiente',
    categoryColors: COLORS.environment,
    coords: [-22.9733, -43.2080],
    city: 'Rio de Janeiro - RJ',
    contributions: 123,
    engaged: 340
  },
  // Belo Horizonte
  {
    id: 8,
    icon: <FaRoad />,
    title: 'Manutenção da Praça da Liberdade',
    description: 'Reforma dos bancos e iluminação dos jardins.',
    status: 'concluido',
    category: 'Infraestrutura',
    categoryColors: COLORS.infrastructure,
    coords: [-19.9320, -43.9380],
    city: 'Belo Horizonte - MG',
    contributions: 88,
    engaged: 150
  },
  // Brasília
  {
    id: 9,
    icon: <MdFavorite />,
    title: 'Melhoria no Hospital de Base',
    description: 'Compra de novos equipamentos para a emergência.',
    status: 'aberto',
    category: 'Saúde',
    categoryColors: COLORS.health,
    coords: [-15.7983, -47.8864],
    city: 'Brasília - DF',
    contributions: 432,
    engaged: 980
  }
];

const FAKE_DISCUSSIONS = [
  {
    id: 1,
    title: 'PL 00/0000 - Manutenção de vias',
    description: 'Projeto para reparo prioritário de vias com alta demanda de buracos.',
    meta: 'Em tramitação na Câmara'
  },
  {
    id: 2,
    title: 'PL 00/0000 - Manutenção de vias',
    description: 'Projeto para reparo prioritário de vias com alta demanda de buracos.',
    meta: 'Em tramitação na Câmara'
  },
  {
    id: 3,
    title: 'PL 00/0000 - Manutenção de vias',
    description: 'Projeto para reparo prioritário de vias com alta demanda de buracos.',
    meta: 'Em tramitação na Câmara'
  },
  {
    id: 4,
    title: 'PL 00/0000 - Manutenção de vias',
    description: 'Projeto para reparo prioritário de vias com alta demanda de buracos.',
    meta: 'Em tramitação na Câmara'
  }
];

const CITY_COORDINATES = {
  'São Paulo - SP': [-23.5505, -46.6333],
  'Rio de Janeiro - RJ': [-22.9068, -43.1729],
  'Belo Horizonte - MG': [-19.9167, -43.9345],
  'Brasília - DF': [-15.7801, -47.9292],
  'Salvador - BA': [-12.9777, -38.5016],
  'Fortaleza - CE': [-3.7172, -38.5434],
  'Curitiba - PR': [-25.4284, -49.2733],
  'Manaus - AM': [-3.1190, -60.0217],
  'Recife - PE': [-8.0543, -34.8813],
  'Porto Alegre - RS': [-30.0346, -51.2177],
  'Belém - PA': [-1.4558, -48.4902],
  'Goiânia - GO': [-16.6869, -49.2648],
  'Guarulhos - SP': [-23.4542, -46.5333],
  'Campinas - SP': [-22.9099, -47.0626],
  'São Luís - MA': [-2.5391, -44.2829]
};
// ==================== END FAKE DATA ====================

const CommunityContainer = styled.div`
  min-height: 100vh;
  background-color: #FAF9F8;
  overflow-x: hidden;
`;

const Header = styled.header`
  background: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-title);
  font-size: 1.5rem;
  font-weight: 800;
  color: #F27D70;

  img {
    width: 30px;
    height: 30px;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled.a`
  color: #4A2525;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #F27D70;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  cursor: pointer;
  color: #666;
  
  svg {
    font-size: 1.2rem;
    transition: color 0.2s;
    
    &:hover {
      color: #F27D70;
    }
  }
`;

const Avatar = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 3px solid #F27D70;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  width: 100%;
  box-sizing: border-box;
`;

const Welcome = styled.div`
  margin-bottom: 2.5rem;
`;

const WelcomeTitle = styled.h1`
  font-family: var(--font-title);
  font-size: 2rem;
  font-weight: 800;
  color: #4A2525;
  margin-bottom: 0.5rem;

  span {
    color: #F27D70;
  }
`;

const WelcomeSubtitle = styled.p`
  color: #666;
  font-size: 1rem;
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-family: var(--font-title);
  font-size: 1.75rem;
  font-weight: 800;
  color: #4A2525;
`;

const SectionSubtitle = styled.p`
  color: #666;
  font-size: 0.95rem;
  margin-top: 0.25rem;
  font-weight: 500;
`;

const ViewAllButton = styled.button`
  background: none;
  border: none;
  color: #F27D70;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    color: #E06C5F;
  }
`;

const LocationSelector = styled.select`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #F27D70;
  font-weight: 700;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  border: 1px solid #F27D70;
  background: transparent;
  font-size: 0.9rem;
  outline: none;
  appearance: none;
  text-align: center;

  &:hover {
    background-color: #FFF4F3;
  }

  option {
    color: #4A2525;
    background: white;
  }
`;

// Stats Cards Styling
const StatsBar = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const StatCard = styled.div`
  background: ${props => props.$isPrimary ? 'linear-gradient(135deg, #FE766D 20%, #F49D68 100%)' : 'white'};
  border-radius: 20px;
  padding: 1.5rem;
  flex: 1;
  min-width: 250px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  color: ${props => props.$isPrimary ? 'white' : '#4A2525'};
  font-family: var(--font-title);
  position: relative;
  overflow: hidden;
`;

const StatContent = styled.div`
  z-index: 1;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  opacity: ${props => props.$isPrimary ? 0.9 : 0.6};
  margin-bottom: 0.25rem;
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
  font-family: var(--font-title);
  line-height: 1;
`;

const StatIconWrapper = styled.div`
  font-size: 2.5rem;
  opacity: ${props => props.$isPrimary ? 0.4 : 1};
  color: ${props => props.$iconColor || 'inherit'};
  display: flex;
  align-items: center;
`;

const TrendSection = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 2rem;
  margin-bottom: 3rem;
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const MapSection = styled.div`
  min-height: 300px;
  height: 100%;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const CategoriesPanel = styled.div`
  display: flex;
  flex-direction: column;
`;

const CategoriesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const CategoryItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const CategoryIconCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${props => props.$bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$iconColor};
  font-size: 0.9rem;
  
  svg {
    color: ${props => props.$iconColor};
  }
`;

const CategoryName = styled.span`
  font-weight: 700;
  color: #4A2525;
  font-size: 1rem;
  flex: 1;
`;

const CategoryCount = styled.span`
  font-size: 0.8rem;
  color: #999;
`;

const ProgressBarBg = styled.div`
  width: 100%;
  height: 6px;
  background-color: #F0F0F0;
  border-radius: 3px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  width: ${props => props.$percent}%;
  background-color: ${props => props.$color};
  border-radius: 3px;
`;

const DemandsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const DiscussionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const getMapMarkers = (demands) => {
  const groups = {};
  
  demands.forEach(demand => {
    const key = demand.coords.join(',');
    if (!groups[key]) {
      groups[key] = {
        position: demand.coords,
        demands: []
      };
    }
    groups[key].demands.push(demand);
  });

  return Object.values(groups).map((group, index) => {
    const categories = {};
    group.demands.forEach(d => {
      categories[d.category] = (categories[d.category] || 0) + 1;
    });

    return {
      id: index,
      position: group.position,
      total: group.demands.length,
      categories
    };
  });
};

export default function Community() {
  const [selectedLocation, setSelectedLocation] = useState(FAKE_USER.location);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const [mapCenter, setMapCenter] = useState([-23.5505, -46.6333]);
  
  const filteredDemands = FAKE_DEMANDS.filter(demand => {

    const normalizedSelected = selectedLocation.replace(', ', ' - ');
    const normalizedDemandCity = demand.city.replace(', ', ' - ');
    return normalizedDemandCity === normalizedSelected;
  });

  const mapMarkers = getMapMarkers(filteredDemands);


  const categoryStats = useMemo(() => {
    const stats = {};
    const total = filteredDemands.length;


    CATEGORY_DEFINITIONS.forEach(cat => {
      stats[cat.id] = { ...cat, count: 0, percent: 0 };
    });

    filteredDemands.forEach(demand => {

      const catId = demand.category; 
      if (stats[catId]) {
        stats[catId].count += 1;
      } else {

      }
    });


    return Object.values(stats)
      .map(stat => ({
        ...stat,
        percent: total > 0 ? (stat.count / total) * 100 : 0
      }))
      .sort((a, b) => b.count - a.count);
  }, [filteredDemands]);


  const generalStats = useMemo(() => {
    return filteredDemands.reduce((acc, demand) => {
      return {
        demandas: acc.demandas + 1,
        contribuicoes: acc.contribuicoes + (demand.contributions || 0),
        engaged: acc.engaged + (demand.engaged || 0)
      };
    }, { demandas: 0, contribuicoes: 0, engaged: 0 });
  }, [filteredDemands]);

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

  const handleLocationChange = async (e) => {
    const newLocation = e.target.value;
    setSelectedLocation(newLocation);
    

    const normalizedLocation = newLocation.replace(', ', ' - ');

    if (CITY_COORDINATES[normalizedLocation]) {
      setMapCenter(CITY_COORDINATES[normalizedLocation]);
      return;
    }
    
    if (CITY_COORDINATES[newLocation]) {
      setMapCenter(CITY_COORDINATES[newLocation]);
      return;
    }

    try {
      const parts = newLocation.split(/[-+,]/).map(p => p.trim());
      if (parts.length >= 2) {
        const city = parts[0];
        const state = parts[1];
        const response = await fetch(`https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(city)}&state=${encodeURIComponent(state)}&country=Brazil&format=json`);
        const data = await response.json();
        
        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          setMapCenter([parseFloat(lat), parseFloat(lon)]);
        }
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  const handleActionClick = (action) => {
    console.log('Action clicked:', action);
    if (action === 'explore') {
      navigate('/discussions');
    } else if (action === 'track') {
      navigate('/demands');
    }
  };

  const handleDemandClick = (demandId) => {
    console.log('Demand clicked:', demandId);
    navigate(`/demand/${demandId}`);
  };

  const handleDiscussionClick = (discussionId) => {
    console.log('Discussion clicked:', discussionId);
    navigate(`/discussion/${discussionId}`);
  };

  return (
    <CommunityContainer>
      <HeaderWhite />

      <Main>
        <Welcome>
          <WelcomeTitle>
            Bem-vindo(a) ao Coral, <span>{FAKE_USER.name}!</span>
          </WelcomeTitle>
          <WelcomeSubtitle>Como podemos apoiar sua voz hoje?</WelcomeSubtitle>
        </Welcome>

        <ActionsGrid>
          <ActionCard
            icon={<MdSpatialAudioOff />}
            title="Reportar uma Demanda ou Ideia"
            description="Compartilhe algo que afeta você ou sua comunidade. O Coral transforma sua fala em uma proposta clara e rastreável."
            onClick={() => handleActionClick('report')}
          />
          <ActionCard
            icon={<MdMessage />}
            title="Explorar discussões públicas"
            description="Explore leis, projetos ou pautas que impactam seu bairro, sua cidade e o país. O Coral adapta a explicação pra encaixar na sua realidade."
            onClick={() => handleActionClick('explore')}
          />
          <ActionCard
            icon={<MdTrendingUp />}
            title="Acompanhar demandas da comunidade"
            description="Veja o que outras pessoas estão relatando, apoiando e acompanhando."
            onClick={() => handleActionClick('track')}
          />
        </ActionsGrid>

        <Section>
          <SectionHeader>
            <div>
              <SectionTitle>Tendências da Região</SectionTitle>
              <SectionSubtitle>Veja o que está acontecendo perto de você!</SectionSubtitle>
            </div>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <MdLocationOn style={{ position: 'absolute', left: '1rem', color: '#F27D70', pointerEvents: 'none' }} />
              <LocationSelector 
                value={selectedLocation} 
                onChange={handleLocationChange}
                style={{ paddingLeft: '2.5rem' }}
              >
                <option value={FAKE_USER.location}>{FAKE_USER.location} (Atual)</option>
                {cities.map(city => (
                  <option key={city.id} value={`${city.name} - ${city.state}`}>
                    {city.name} - {city.state}
                  </option>
                ))}
              </LocationSelector>
            </div>
          </SectionHeader>

          <StatsBar>
            <StatCard $isPrimary>
              <StatContent>
                <StatLabel>Pessoas engajadas</StatLabel>
                <StatValue>{generalStats.engaged.toLocaleString()}</StatValue>
              </StatContent>
              <StatIconWrapper>
                <MdGroups2 size={62} opacity={0.5} />
              </StatIconWrapper>
            </StatCard>

            <StatCard style={{ borderLeft: '4px solid #F27D70' }}>
              <StatIconWrapper $iconColor="#F27D70">
                <MdThumbsUpDown />
              </StatIconWrapper>
              <StatContent>
                <StatValue>{generalStats.contribuicoes.toLocaleString()}</StatValue>
                <StatLabel style={{ color: '#F27D70' }}>Contribuições</StatLabel>
              </StatContent>
            </StatCard>

            <StatCard style={{ borderLeft: '4px solid #F49D68' }}>
              <StatIconWrapper $iconColor="#F49D68">
                <MdInsertDriveFile />
              </StatIconWrapper>
              <StatContent>
                <StatValue>{generalStats.demandas.toLocaleString()}</StatValue>
                <StatLabel style={{ color: '#F49D68' }}>Demandas ativas</StatLabel>
              </StatContent>
            </StatCard>
          </StatsBar>

          <TrendSection>
            <MapSection>
              <Map center={mapCenter} markers={mapMarkers} />
            </MapSection>

            <CategoriesPanel>
              <SectionTitle style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>Últimos assuntos</SectionTitle>
              <SectionSubtitle style={{ marginBottom: '1.5rem' }}>
                {filteredDemands.length} denúncias na última semana
              </SectionSubtitle>

              <CategoriesList>
                {categoryStats.map(category => (
                  <CategoryItem key={category.id}>
                    <CategoryHeader>
                      <CategoryIconCircle $bgColor={category.colors.bg} $iconColor={category.colors.icon}>
                        {category.icon}
                      </CategoryIconCircle>
                      <CategoryName>{category.name}</CategoryName>
                      <CategoryCount>{category.count} demandas</CategoryCount>
                    </CategoryHeader>
                    <ProgressBarBg>
                      <ProgressBarFill $percent={category.percent} $color={category.colors.icon} />
                    </ProgressBarBg>
                  </CategoryItem>
                ))}
              </CategoriesList>
            </CategoriesPanel>
          </TrendSection>
        </Section>

        <Section>
          <SectionHeader>
            <div>
              <SectionTitle>Demandas destaques</SectionTitle>
              <SectionSubtitle>Demandas que estão recebendo alto engajamento</SectionSubtitle>
            </div>
            <ViewAllButton onClick={() => navigate('/demands')}>
              Ver todos &gt;
            </ViewAllButton>
          </SectionHeader>

          <DemandsGrid>
            {FAKE_DEMANDS.slice(0, 6).map(demand => (
              <DemandCard
                key={demand.id}
                icon={demand.icon}
                title={demand.title}
                description={demand.description}
                status={demand.status}
                category={demand.category}
                categoryColors={demand.categoryColors}
                onClick={() => handleDemandClick(demand.id)}
              />
            ))}
          </DemandsGrid>
        </Section>

        <Section>
          <SectionHeader>
            <div>
              <SectionTitle>Discussões Públicas</SectionTitle>
              <SectionSubtitle>Demandas que estão recebendo alto engajamento</SectionSubtitle>
            </div>
            <ViewAllButton onClick={() => navigate('/discussions')}>
              Ver todos &gt;
            </ViewAllButton>
          </SectionHeader>

          <DiscussionsList>
            {FAKE_DISCUSSIONS.slice(0, 6).map(discussion => (
              <DiscussionCard
                key={discussion.id}
                title={discussion.title}
                description={discussion.description}
                meta={discussion.meta}
                onClick={() => handleDiscussionClick(discussion.id)}
              />
            ))}
          </DiscussionsList>
        </Section>
      </Main>
    </CommunityContainer>
  );
}
