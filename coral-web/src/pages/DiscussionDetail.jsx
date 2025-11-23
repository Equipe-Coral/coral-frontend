import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack, MdPictureAsPdf, MdGavel, MdNotificationsNone, MdChatBubbleOutline, MdSmartToy, MdPublic } from 'react-icons/md';
import HeaderWhite from '../components/HeaderWhite';

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

const BackButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-light);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  width: fit-content;
  
  &:hover {
    color: var(--primary);
  }
`;

const MainCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const HeaderContent = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-family: var(--font-title);
  font-size: 1.75rem;
  color: var(--text);
  margin-bottom: 1rem;
`;

const MetaRow = styled.div`
  display: flex;
  gap: 2rem;
  font-size: 0.9rem;
  color: var(--text-light);
`;

const StatusText = styled.span`
  color: #F57C00;
  font-weight: 700;
`;

const SubscribeButton = styled.button`
  background: #F27D70;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1.5rem;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #E06C5F;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 7fr 3fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SectionTitle = styled.h3`
  font-family: var(--font-title);
  font-size: 1.25rem;
  color: var(--text);
  margin-bottom: 0.5rem;
`;

const SummaryCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
`;

const Tabs = styled.div`
  display: flex;
  gap: 2rem;
  border-bottom: 1px solid #E0E0E0;
  margin-bottom: 1.5rem;
`;

const Tab = styled.button`
  background: none;
  border: none;
  padding-bottom: 0.75rem;
  font-weight: 600;
  color: ${props => props.active ? '#F27D70' : '#999'};
  border-bottom: 2px solid ${props => props.active ? '#F27D70' : 'transparent'};
  cursor: pointer;
  font-size: 0.95rem;

  &:hover {
    color: #F27D70;
  }
`;

const SummaryText = styled.p`
  color: var(--text-light);
  line-height: 1.6;
  font-size: 1rem;
`;

const VotingCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  text-align: center;
`;

const VotingQuestion = styled.h4`
  font-size: 1.1rem;
  color: var(--text);
  margin-bottom: 1.5rem;
`;

const ProgressBarContainer = styled.div`
  margin-bottom: 0.5rem;
`;

const ProgressLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

const SimLabel = styled.span`
  color: #66BB6A;
`;

const NaoLabel = styled.span`
  color: #EF5350;
`;

const ProgressBar = styled.div`
  height: 8px;
  background: #EF5350;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: ${props => props.percent}%;
  background: #66BB6A;
`;

const VotingFooter = styled.p`
  font-size: 0.75rem;
  color: #999;
  margin-top: 1rem;
`;

const TimelineContainer = styled.div`
  position: relative;
  padding-left: 1rem;
  
  &::before {
    content: '';
    position: absolute;
    left: 5px;
    top: 10px;
    bottom: 10px;
    width: 2px;
    background: #E0E0E0;
  }
`;

const TimelineItem = styled.div`
  position: relative;
  padding-left: 2rem;
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 4px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${props => props.active ? '#90EE90' : '#E0E0E0'};
    border: 2px solid white;
    box-shadow: 0 0 0 2px ${props => props.active ? '#90EE90' : 'transparent'};
    z-index: 1;
  }
`;

const TimelineTitle = styled.h4`
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.25rem;
`;

const TimelineDate = styled.span`
  font-size: 0.75rem;
  color: #999;
  display: block;
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 1rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  ${props => props.primary ? `
    background: #F27D70;
    color: white;
    border: none;
    box-shadow: 0 4px 10px rgba(242, 125, 112, 0.3);
    
    &:hover {
      background: #E06C5F;
    }
  ` : `
    background: transparent;
    color: var(--text);
    border: 1px solid #E0E0E0;
    
    &:hover {
      background: #FFF5F2;
      border-color: var(--primary);
      color: var(--primary);
    }
  `}
`;

const DocCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const DocIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: #FFF5F2;
  color: #F27D70;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
`;

const DocInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const DocTitle = styled.span`
  font-weight: 700;
  color: var(--text);
  font-size: 0.9rem;
`;

const DocDate = styled.span`
  font-size: 0.75rem;
  color: #999;
`;

const fake_data = {
  id: "PL 123/2023",
  title: "PL 123/2023 - Ilumina Sampa",
  author: "Vereador Emanuel Dias",
  organ: "Câmara Municipal de SP",
  status: "Em Tramitação",
  summary: {
    simplified: "Imagine que as luzes da rua são muito antigas e fracas. Este projeto de lei quer trocar todas as lâmpadas da cidade por luzes novas de LED. Essas luzes são mais fortes, gastam menos energia e duram mais tempo. Com isso, as ruas ficariam mais seguras para todo mundo, de noite, e a prefeitura ainda economizaria dinheiro.",
    technical: "O Projeto de Lei visa instituir o Programa de Modernização da Iluminação Pública, substituindo o parque atual por tecnologia LED, visando eficiência energética e redução de custos operacionais.",
    impact: "Para o cidadão, isso significa ruas mais iluminadas, maior sensação de segurança e potencial redução na taxa de iluminação pública a longo prazo."
  },
  voting: {
    sim: 4681,
    nao: 4600,
    lastUpdate: "23/11/2025 16:44:12"
  },
  timeline: [
    { title: "Apresentação X", date: "15 de Julho de 2025", active: true },
    { title: "Apresentação X", date: "15 de Julho de 2025", active: true },
    { title: "Apresentação X", date: "15 de Julho de 2025", active: true },
    { title: "Apresentação X", active: false },
    { title: "Apresentação X", active: false },
    { title: "Apresentação X", active: false }
  ],
  documents: [
    { title: "PDF Original", date: "15 de Julho de 2025", type: "pdf" },
    { title: "Parecer CCJ", date: "15 de Julho de 2025", type: "legal" }
  ]
};

const DiscussionDetail = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('simplified');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const totalVotes = fake_data.voting.sim + fake_data.voting.nao;
  const simPercent = (fake_data.voting.sim / totalVotes) * 100;

  return (
    <PageContainer>
      <HeaderWhite />
      <ContentWrapper>
        <BackButton onClick={() => navigate(-1)}>
          <MdArrowBack size={24} />
          Voltar
        </BackButton>

        <MainCard>
          <HeaderContent>
            <Title>{fake_data.title}</Title>
            <MetaRow>
              <span><strong>Autor(es):</strong> {fake_data.author}</span>
              <span><strong>Órgão:</strong> {fake_data.organ}</span>
              <span><strong>Status:</strong> <StatusText>{fake_data.status}</StatusText></span>
            </MetaRow>
          </HeaderContent>
          <SubscribeButton>
            <MdNotificationsNone size={20} />
            Receber atualizações
          </SubscribeButton>
        </MainCard>

        <Grid>
          <Column>
            <SectionTitle>Resumo Inteligente (Feito por Coral)</SectionTitle>
            <SummaryCard>
              <Tabs>
                <Tab 
                  active={activeTab === 'simplified'} 
                  onClick={() => setActiveTab('simplified')}
                >
                  Resumo Simplificado
                </Tab>
                <Tab 
                  active={activeTab === 'technical'} 
                  onClick={() => setActiveTab('technical')}
                >
                  Resumo técnico
                </Tab>
                <Tab 
                  active={activeTab === 'impact'} 
                  onClick={() => setActiveTab('impact')}
                >
                  Como essa PL pode te afetar
                </Tab>
              </Tabs>
              <SummaryText>
                {fake_data.summary[activeTab]}
              </SummaryText>
            </SummaryCard>

            <SectionTitle style={{marginTop: '2rem'}}>Votação</SectionTitle>
            <VotingCard>
              <VotingQuestion>Você apoia essa proposição?</VotingQuestion>
              <ProgressBarContainer>
                <ProgressLabels>
                  <SimLabel>{fake_data.voting.sim.toLocaleString()} Sim</SimLabel>
                  <NaoLabel>{fake_data.voting.nao.toLocaleString()} Não</NaoLabel>
                </ProgressLabels>
                <ProgressBar>
                  <ProgressFill percent={simPercent} />
                </ProgressBar>
              </ProgressBarContainer>
              <VotingFooter>Votos apurados até {fake_data.voting.lastUpdate}</VotingFooter>
            </VotingCard>

            <SectionTitle style={{marginTop: '2rem'}}>Linha do tempo</SectionTitle>
            <TimelineContainer>
              {fake_data.timeline.map((item, index) => (
                <TimelineItem key={index} active={item.active}>
                  <TimelineTitle>{item.title}</TimelineTitle>
                  {item.date && <TimelineDate>{item.date}</TimelineDate>}
                </TimelineItem>
              ))}
            </TimelineContainer>
          </Column>

          <Column>
            <SectionTitle>Ações para o cidadão</SectionTitle>
            <ActionButton primary>
              <MdChatBubbleOutline size={20} />
              Enviar opinião
            </ActionButton>
            <ActionButton>
              <MdSmartToy size={20} />
              Tirar dúvidas com IA
            </ActionButton>
            <ActionButton>
              <MdPublic size={20} />
              Página Oficial
            </ActionButton>

            <SectionTitle style={{ marginTop: '1rem' }}>Documentos Oficiais</SectionTitle>
            {fake_data.documents.map((doc, index) => (
              <DocCard key={index}>
                <DocIcon>
                  {doc.type === 'pdf' ? <MdPictureAsPdf /> : <MdGavel />}
                </DocIcon>
                <DocInfo>
                  <DocTitle>{doc.title}</DocTitle>
                  <DocDate>{doc.date}</DocDate>
                </DocInfo>
              </DocCard>
            ))}
          </Column>
        </Grid>
      </ContentWrapper>
    </PageContainer>
  );
};

export default DiscussionDetail;
