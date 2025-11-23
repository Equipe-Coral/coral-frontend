import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { MdLocationOn, MdPictureAsPdf, MdThumbUp, MdCheck, MdShield, MdArrowBack } from 'react-icons/md';
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

const MainCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-family: var(--font-title);
  font-size: 1.75rem;
  color: var(--text);
  margin-bottom: 0.5rem;
  max-width: 80%;
`;

const Hash = styled.span`
  font-size: 0.875rem;
  color: #999;
  margin-left: 1rem;
  font-weight: normal;
`;

const LocationRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #999;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-family: var(--font-title);
  font-size: 1.25rem;
  color: var(--text);
  margin-bottom: 1rem;
`;

const Text = styled.p`
  color: var(--text-light);
  line-height: 1.6;
  font-size: 1rem;
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
  gap: 2rem;
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

  ${props => props.current && `
    &::after {
      background: #F27D70;
      box-shadow: 0 0 0 2px #F27D70;
    }
  `}
`;

const TimelineTitle = styled.h4`
  font-weight: 600;
  color: ${props => props.active || props.current ? 'var(--text)' : '#999'};
  margin-bottom: 0.25rem;
`;

const TimelineDate = styled.span`
  font-size: 0.75rem;
  color: #999;
  display: block;
`;

const TimelineDesc = styled.p`
  font-size: 0.875rem;
  color: var(--text-light);
  margin-top: 0.25rem;
`;

const ReportCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
`;

const ReportSection = styled.div`
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ReportLabel = styled.h4`
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.5rem;
`;

const DownloadLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary);
  font-weight: 600;
  text-decoration: none;
  margin: 1.5rem 0;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;
`;

const SupportButton = styled.button`
  width: 100%;
  background: ${props => props.supported ? '#E0E0E0' : 'var(--primary)'};
  color: ${props => props.supported ? '#666' : 'white'};
  border: none;
  border-radius: 12px;
  padding: 1rem;
  font-size: 1.125rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: all 0.2s;
  box-shadow: ${props => props.supported ? 'none' : '0 4px 10px rgba(242, 125, 112, 0.3)'};
  cursor: ${props => props.supported ? 'default' : 'pointer'};

  &:hover {
    background: ${props => props.supported ? '#E0E0E0' : 'var(--primary-hover)'};
  }
`;

const BillCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const BillHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const BillTitle = styled.h4`
  font-weight: 700;
  color: var(--text);
  font-size: 1.125rem;
  margin-bottom: 1rem;
`;

const BillTag = styled.span`
  background: #FFF3E0;
  color: #F57C00;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
`;

const BillLink = styled.a`
  color: var(--primary);
  font-weight: 600;
  font-size: 0.875rem;
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

const BillFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

const CategoryTag = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 700;
  background-color: ${props => props.$bgColor || '#FFF4E6'};
  color: #4A2525;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  border: 1px solid transparent;
  height: fit-content;

  svg {
    font-size: 0.9rem;
    color: ${props => props.$iconColor || 'inherit'};
  }
`;

const SupportCount = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary);
  font-weight: 600;
  margin-top: 1rem;
  font-size: 0.9rem;
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

const fake_data = {
  id: "0x27a32e.23x9f82x00",
  title: "Programa Municipal de Iluminação Segura da Praça do Cajueiro",
  location: "Rua Fictícia, 123 - Pinheiros, São Paulo - SP",
  status: "Segurança",
  supports: 125,
  summary: "A comunidade local relata uma preocupante falta de iluminação na Praça do Cajueiro, criando um ambiente de insegurança durante a noite. A ausência de partes de luz funcionais e a vegetação densa que obstrui a pouca luz existente contribuem para a baixa visibilidade, aumentando o risco de acidentes e atividades ilícitas. Os moradores solicitam a instalação urgente de nova iluminação e a poda adequada das árvores para garantir a segurança e o uso comunitário do espaço.",
  timeline: [
    { status: "Relato criado", date: "15 de Julho de 2025", active: true },
    { status: "Publicado como demanda comunitária", date: "15 de Julho de 2025", active: true },
    { status: "Relatório criado", description: "Atingiu o limiar de apoios! O relatório está sendo gerado.", active: true, current: true },
    { status: "Relatório enviado", active: false },
    { status: "Órgão respondeu", active: false },
    { status: "Resolvido / Não resolvido / Em acompanhamento", active: false }
  ],
  communityReport: {
    summary: "Moradores da região da Praça do Cajueiro relatam a inexistência de iluminação pública adequada no local após as 19h, circunstância que tem favorecido a ocorrência de delitos patrimoniais e elevado a sensação de insegurança.\n\nA insuficiência de luminárias e a ausência de rondas preventivas da Guarda Municipal configuram situação que compromete o uso seguro do espaço público e viola o direito fundamental à segurança previsto no art. 144 da Constituição Federal.",
    impact: "Afeta diretamente a segurança de centenas de moradores do entorno, incluindo crianças e idosos que utilizam o espaço para lazer.",
    organs: "Secretaria de Obras, Prefeitura de São Paulo",
    protocol: "PMSSP-2025-07-21-00123",
    responseStatus: "Aguardando resposta"
  },
  relatedBills: [
    {
      id: "PL 00/0000",
      title: "Ilumina Sampa",
      summary: "Propõe a modernização completa do parque de iluminação pública da cidade com tecnologia LED.",
      relation: "Este projeto de lei pode acelerar a substituição das lâmpadas na sua região.",
      status: "Em tramitação na Câmara"
    },
    {
      id: "PL 00/0000",
      title: "Ilumina Sampa",
      summary: "Propõe a modernização completa do parque de iluminação pública da cidade com tecnologia LED.",
      relation: "Este projeto de lei pode acelerar a substituição das lâmpadas na sua região.",
      status: "Em tramitação na Câmara"
    }
  ]
};

const DemandDetail = () => {
  const navigate = useNavigate();
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSupport = () => {
    setIsSupported(true);
  };

  return (
    <PageContainer>
      <HeaderWhite />
      <ContentWrapper>
        <BackButton onClick={() => navigate(-1)}>
          <MdArrowBack size={24} />
          Voltar
        </BackButton>
        <MainCard>
          <HeaderRow>
            <Title>
              {fake_data.title}
              <Hash>#{fake_data.id}</Hash>
            </Title>
            <CategoryTag $bgColor="#F5E6D3" $iconColor="#D89F66">
              <MdShield />
              {fake_data.status}
            </CategoryTag>
          </HeaderRow>
          
          <LocationRow>
            <MdLocationOn size={18} />
            {fake_data.location}
          </LocationRow>

          <SectionTitle>Resumo da demanda (gerado por Inteligência Artificial):</SectionTitle>
          <Text>{fake_data.summary}</Text>
          
          <SupportCount>
            <MdThumbUp size={18} />
            {fake_data.supports} pessoas apoiaram esta demanda
          </SupportCount>
        </MainCard>

        <Grid>
          <Column>
            <SectionTitle>Linha do tempo</SectionTitle>
            <TimelineContainer>
              {fake_data.timeline.map((item, index) => (
                <TimelineItem key={index} active={item.active} current={item.current}>
                  <TimelineTitle active={item.active} current={item.current}>
                    {item.status}
                  </TimelineTitle>
                  {item.date && <TimelineDate>{item.date}</TimelineDate>}
                  {item.description && <TimelineDesc>{item.description}</TimelineDesc>}
                </TimelineItem>
              ))}
            </TimelineContainer>

            <SectionTitle>Relatório Comunitário</SectionTitle>
            <ReportCard>
              <ReportSection>
                <ReportLabel>Resumo:</ReportLabel>
                <Text style={{ whiteSpace: 'pre-line' }}>{fake_data.communityReport.summary}</Text>
              </ReportSection>
              
              <ReportSection>
                <ReportLabel>Impacto estimado:</ReportLabel>
                <Text>{fake_data.communityReport.impact}</Text>
              </ReportSection>

              <DownloadLink href="#">
                <MdPictureAsPdf size={20} />
                Baixar relatório completo (PDF)
              </DownloadLink>

              <ReportSection>
                <ReportLabel>Órgãos contatados:</ReportLabel>
                <Text>{fake_data.communityReport.organs}</Text>
              </ReportSection>

              <InfoGrid>
                <div>
                  <ReportLabel>Protocolo de envio:</ReportLabel>
                  <Text>{fake_data.communityReport.protocol}</Text>
                </div>
                <div>
                  <ReportLabel>Status da resposta:</ReportLabel>
                  <Text style={{ color: '#D4A017', fontWeight: '600' }}>
                    {fake_data.communityReport.responseStatus}
                  </Text>
                </div>
              </InfoGrid>
            </ReportCard>
          </Column>

          <Column>
            <SectionTitle>Apoiar Demanda</SectionTitle>
            <SupportButton onClick={handleSupport} supported={isSupported} disabled={isSupported}>
              {isSupported ? <MdCheck size={24} /> : <MdThumbUp size={24} />}
              {isSupported ? 'Você apoiou essa demanda' : 'Apoiar essa demanda'}
            </SupportButton>

            <SectionTitle style={{ marginTop: '1rem' }}>Projetos de Leis Relacionados</SectionTitle>
            {fake_data.relatedBills.map((bill, index) => (
              <BillCard key={index} onClick={() => navigate(`/discussion/${bill.id}`)}>
                <BillTitle>{bill.id} - {bill.title}</BillTitle>
                
                <ReportSection>
                  <ReportLabel style={{ fontSize: '0.9rem' }}>Resumo:</ReportLabel>
                  <Text style={{ fontSize: '0.9rem' }}>{bill.summary}</Text>
                </ReportSection>

                <ReportSection>
                  <ReportLabel style={{ fontSize: '0.9rem' }}>Relação:</ReportLabel>
                  <Text style={{ fontSize: '0.9rem' }}>{bill.relation}</Text>
                </ReportSection>

                <BillFooter>
                  <BillTag>{bill.status}</BillTag>
                  <BillLink>Ver detalhes &gt;</BillLink>
                </BillFooter>
              </BillCard>
            ))}
          </Column>
        </Grid>
      </ContentWrapper>
    </PageContainer>
  );
};

export default DemandDetail;
