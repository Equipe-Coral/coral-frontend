import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { 
  MdEdit, 
  MdAddCircleOutline, 
  MdThumbUp, 
  MdHourglassEmpty, 
  MdTrendingUp, 
  MdDescription, 
  MdVisibility, 
  MdHandshake,
  MdVerified,
  MdRecordVoiceOver,
  MdGroups,
  MdLock,
  MdChevronRight,
  MdComment,
  MdRocketLaunch
} from 'react-icons/md';
import HeaderWhite from '../components/HeaderWhite';
import logo from '../assets/pink_logo.svg';

// ==================== FAKE DATA ====================
const USER_DATA = {
  name: 'Carol',
  avatar: logo,
  bio: 'Acredito no poder da comunidade para transformar a realidade local. Meus interesses são educação, meio ambiente e mobilidade urbana. Busco colaborar em projetos que gerem impacto positivo e duradouro para nossa cidade.',
  stats: {
    created: 12,
    supported: 47,
    active: 8,
    boosted: 3
  },
  activities: [
    { id: 1, type: 'created', text: 'Você criou a demanda "Revitalização da Praça da Matriz".', time: 'há 2 dias' },
    { id: 2, type: 'supported', text: 'Você apoiou o PL "Incentivo à Coleta Seletiva".', time: 'há 5 dias' },
    { id: 3, type: 'commented', text: 'Você comentou na demanda "Ciclofaixa na Avenida Principal".', time: 'há 1 semana' }
  ],
  demandsStatus: {
    analysis: { current: 4, total: 8 },
    waiting: { current: 2, total: 8 },
    completed: { current: 2, total: 8 }
  }
};

// ==================== STYLES ====================
const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #FAF9F8;
  padding-bottom: 4rem;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const ProfileAvatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #F27D70;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  img {
    width: 60%;
    height: 60%;
    object-fit: contain;
    filter: brightness(0) invert(1);
  }
`;

const WelcomeText = styled.div`
  h1 {
    font-family: var(--font-title);
    font-size: 2.5rem;
    color: #4A2525;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
    font-size: 1.1rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SectionTitle = styled.h2`
  font-family: var(--font-title);
  font-size: 1.5rem;
  color: #4A2525;
  margin-bottom: 1rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
`;

const InterestsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  h3 {
    font-weight: 700;
    color: #4A2525;
  }
  
  a {
    color: #F27D70;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const BioText = styled.p`
  color: #666;
  line-height: 1.6;
  font-size: 0.95rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
  
  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const ImpactCard = styled(Card)`
  background: linear-gradient(135deg, #FFF5F2 0%, #FFFFFF 100%);
  border: 1px solid #F27D70;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
`;

const ImpactIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #F27D70;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const ImpactContent = styled.div`
  h4 {
    color: #4A2525;
    font-size: 1.1rem;
    margin-bottom: 0.25rem;
    font-weight: 700;
  }
  
  p {
    color: #666;
    font-size: 0.95rem;
    line-height: 1.4;
  }
`;

const StatBox = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.5rem 1rem;
  gap: 0.5rem;
`;

const StatIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.$bg || '#FFF5F2'};
  color: ${props => props.$color || '#F27D70'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const StatNumber = styled.div`
  font-family: var(--font-title);
  font-size: 2rem;
  font-weight: 700;
  color: #4A2525;
`;

const StatLabel = styled.div`
  font-size: 0.85rem;
  color: #666;
  line-height: 1.2;
`;

const ActivityItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ActivityIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #FFF5F2;
  color: #F27D70;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ActivityContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  
  p {
    color: #4A2525;
    font-size: 0.95rem;
    
    span {
      font-weight: 600;
      color: #F27D70;
    }
  }
  
  small {
    color: #999;
    font-size: 0.8rem;
  }
`;

const QuickLinkItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    color: #F27D70;
  }
  
  &:last-child {
    border-bottom: none;
  }
  
  div {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-weight: 600;
    color: #4A2525;
    
    svg {
      color: #F27D70;
      font-size: 1.1rem;
    }
  }
  
  .arrow {
    color: #ccc;
  }
`;

const StatusItem = styled.div`
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const StatusHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #4A2525;
  
  span:last-child {
    color: #666;
    font-weight: 400;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #FFF5F2;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${props => props.$percent}%;
  background-color: #F27D70;
  border-radius: 4px;
`;

const BadgesGrid = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`;

const BadgeItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
`;

const BadgeIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.$locked ? '#fff' : '#FFF5F2'};
  border: ${props => props.$locked ? '1px dashed #ddd' : 'none'};
  color: ${props => props.$locked ? '#ddd' : '#F27D70'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const BadgeLabel = styled.span`
  font-size: 0.7rem;
  color: ${props => props.$locked ? '#999' : '#4A2525'};
  font-weight: 600;
  max-width: 60px;
  line-height: 1.2;
`;

const Footer = styled.footer`
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
  font-size: 0.85rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  
  a {
    color: #666;
    text-decoration: none;
    &:hover { color: #F27D70; }
  }
`;

const LogoFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-title);
  font-weight: 800;
  color: #F27D70;
  
  img { width: 20px; }
`;

export default function Profile() {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <HeaderWhite />
      
      <MainContent>
        <ProfileHeader>
          <ProfileAvatar>
            <img src={USER_DATA.avatar} alt={USER_DATA.name} />
          </ProfileAvatar>
          <WelcomeText>
            <h1>Olá, {USER_DATA.name}!</h1>
            <p>Seja bem-vindo de volta ao seu painel de engajamento.</p>
          </WelcomeText>
        </ProfileHeader>

        <Grid>
          <Column>
            <section>
              <SectionTitle>Resumo de Engajamento</SectionTitle>
              <StatsGrid>
                <StatBox>
                  <StatIcon><MdAddCircleOutline /></StatIcon>
                  <StatNumber>{USER_DATA.stats.created}</StatNumber>
                  <StatLabel>Demandas Criadas</StatLabel>
                </StatBox>
                <StatBox>
                  <StatIcon $bg="#FFF0F0" $color="#E57373"><MdThumbUp /></StatIcon>
                  <StatNumber>{USER_DATA.stats.supported}</StatNumber>
                  <StatLabel>Demandas Apoiadas</StatLabel>
                </StatBox>
                <StatBox>
                  <StatIcon $bg="#FFF8E1" $color="#FFB74D"><MdHourglassEmpty /></StatIcon>
                  <StatNumber>{USER_DATA.stats.active}</StatNumber>
                  <StatLabel>Demandas Ativas</StatLabel>
                </StatBox>
              </StatsGrid>
              
              <ImpactCard>
                <ImpactIcon>
                  <MdRocketLaunch />
                </ImpactIcon>
                <ImpactContent>
                  <h4>Impacto Real</h4>
                  <p>Seu engajamento ajudou <strong>3 demandas</strong> a terem retorno de órgãos ou avançarem no setor legislativo/executivo.</p>
                </ImpactContent>
              </ImpactCard>
            </section>

            <section>
              <SectionTitle>Histórico de Atividade Recente</SectionTitle>
              <Card>
                {USER_DATA.activities.map(activity => (
                  <ActivityItem key={activity.id}>
                    <ActivityIcon>
                      {activity.type === 'created' && <MdAddCircleOutline />}
                      {activity.type === 'supported' && <MdThumbUp />}
                      {activity.type === 'commented' && <MdComment />}
                    </ActivityIcon>
                    <ActivityContent>
                      <p dangerouslySetInnerHTML={{ 
                        __html: activity.text.replace(/"([^"]+)"/g, '<span>"$1"</span>') 
                      }} />
                      <small>{activity.time}</small>
                    </ActivityContent>
                  </ActivityItem>
                ))}
              </Card>
            </section>
          </Column>

          <Column>
            <section>
              <SectionTitle>Links Rápidos</SectionTitle>
              <Card>
                <QuickLinkItem onClick={() => navigate('/demands')}>
                  <div><MdDescription /> Minhas Demandas</div>
                  <MdChevronRight className="arrow" />
                </QuickLinkItem>
                <QuickLinkItem onClick={() => navigate('/demands')}>
                  <div><MdVisibility /> Demandas</div>
                  <MdChevronRight className="arrow" />
                </QuickLinkItem>
                <QuickLinkItem onClick={() => navigate('/discussions')}>
                  <div><MdComment /> Discussões</div>
                  <MdChevronRight className="arrow" />
                </QuickLinkItem>
              </Card>
            </section>

            <section>
              <SectionTitle>Impacto das Demandas</SectionTitle>
              <Card>
                <div style={{ marginBottom: '1rem', fontSize: '0.85rem', color: '#666' }}>
                  Status das suas demandas ativas
                </div>
                <StatusItem>
                  <StatusHeader>
                    <span>Em análise</span>
                    <span>{USER_DATA.demandsStatus.analysis.current} de {USER_DATA.demandsStatus.analysis.total}</span>
                  </StatusHeader>
                  <ProgressBar>
                    <ProgressFill $percent={(USER_DATA.demandsStatus.analysis.current / USER_DATA.demandsStatus.analysis.total) * 100} />
                  </ProgressBar>
                </StatusItem>
                <StatusItem>
                  <StatusHeader>
                    <span>Aguardando Apoios</span>
                    <span>{USER_DATA.demandsStatus.waiting.current} de {USER_DATA.demandsStatus.waiting.total}</span>
                  </StatusHeader>
                  <ProgressBar>
                    <ProgressFill $percent={(USER_DATA.demandsStatus.waiting.current / USER_DATA.demandsStatus.waiting.total) * 100} />
                  </ProgressBar>
                </StatusItem>
                <StatusItem>
                  <StatusHeader>
                    <span>Concluídas</span>
                    <span>{USER_DATA.demandsStatus.completed.current} de {USER_DATA.demandsStatus.completed.total}</span>
                  </StatusHeader>
                  <ProgressBar>
                    <ProgressFill $percent={(USER_DATA.demandsStatus.completed.current / USER_DATA.demandsStatus.completed.total) * 100} />
                  </ProgressBar>
                </StatusItem>
              </Card>
            </section>
          </Column>
        </Grid>
      </MainContent>
    </PageContainer>
  );
}
