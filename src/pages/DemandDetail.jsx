import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { MdLocationOn, MdPictureAsPdf, MdThumbUp, MdCheck, MdShield, MdArrowBack } from 'react-icons/md';
import HeaderWhite from '../components/HeaderWhite';
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
    background: ${props => props.$active ? '#90EE90' : '#E0E0E0'};
    border: 2px solid white;
    box-shadow: 0 0 0 2px ${props => props.$active ? '#90EE90' : 'transparent'};
    z-index: 1;
  }

  ${props => props.$current && `
    &::after {
      background: #F27D70;
      box-shadow: 0 0 0 2px #F27D70;
    }
  `}
`;

const TimelineTitle = styled.h4`
  font-weight: 600;
  color: ${props => props.$active || props.$current ? 'var(--text)' : '#999'};
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
  background: ${props => props.$supported ? '#E0E0E0' : 'var(--primary)'};
  color: ${props => props.$supported ? '#666' : 'white'};
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
  box-shadow: ${props => props.$supported ? 'none' : '0 4px 10px rgba(242, 125, 112, 0.3)'};
  cursor: ${props => props.$supported ? 'default' : 'pointer'};

  &:hover {
    background: ${props => props.$supported ? '#E0E0E0' : 'var(--primary-hover)'};
  }
`;

const BillCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.25rem;
  margin-bottom: 0rem;
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
  font-size: 1.05rem;
  margin-bottom: 0.5rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const BillTag = styled.span`
  background: #FFF3E0;
  color: #F57C00;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
`;

const BillSummary = styled.p`
  color: var(--text-light);
  font-size: 0.9rem;
  line-height: 1.4;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
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
  margin-top: 0.75rem;
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

// Demand detail is fetched from API

const DemandDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [demand, setDemand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [similarBills, setSimilarBills] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function loadDemand() {
      setLoading(true);
      setError('');
      try {
        const data = await api.getDemandById(id);
        setDemand(data);
        setIsSupported(!!data.supportedByUser);
        // Buscar PLs semelhantes via camara-proxy (fallback client-side)
        // Priorizar título para busca, pois resumo pode ser muito longo ou conter textos genéricos
        const topic = (data.title || data.summary || '').trim();
        if (topic) {
          // Remover stopwords e pegar as palavras mais significativas
          const stopwords = ['de', 'a', 'o', 'as', 'os', 'e', 'para', 'com', 'em', 'do', 'da', 'dos', 'das', 'um', 'uma', 'uns', 'umas', 'que', 'é', 'foi', 'por', 'na', 'no', 'nas', 'nos', 'se', 'ao', 'aos', 'pelo', 'pela', 'esta', 'este', 'isso', 'aquilo', 'demandamos', 'solicitamos', 'queremos', 'sobre', 'como'];
          
          // Função para remover acentos
          const normalize = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

          // Filtrar stopwords e palavras curtas
          const meaningfulWords = topic.split(/[\s,.-]+/)
            .map(w => w.trim())
            .filter(w => w.length > 3 && !stopwords.includes(w.toLowerCase()));
            
          try {
            let items = [];
            
            // 1. Tenta buscar com as 2 primeiras palavras juntas (mais específico)
            if (meaningfulWords.length >= 2) {
              const combinedKeyword = meaningfulWords.slice(0, 2).map(normalize).join(' ');
              console.log('Tentando busca combinada:', combinedKeyword);
              const resp = await api.searchPropositions({ keyword: combinedKeyword });
              items = resp.dados || [];
            }

            // 2. Se não encontrou nada, tenta palavra por palavra (mais abrangente)
            if (items.length === 0 && meaningfulWords.length > 0) {
              console.log('Busca combinada vazia, tentando palavras individuais...');
              for (const word of meaningfulWords.slice(0, 3)) { // Tenta as 3 primeiras palavras
                const w = normalize(word);
                console.log('Tentando palavra:', w);
                const resp = await api.searchPropositions({ keyword: w });
                if (resp.dados && resp.dados.length > 0) {
                  items = resp.dados;
                  console.log(`Encontrados ${items.length} resultados com a palavra "${w}"`);
                  break; // Encontrou resultados, para de procurar
                }
              }
            }

            console.log('Items finais:', items);
            const top3 = items.slice(0, 3).map(p => ({
              id: p.id || p.billCode || (p.siglaTipo ? (p.siglaTipo + ' ' + (p.numero || '') + '/' + (p.ano || '')) : ''),
              billCode: (p.siglaTipo && p.numero && p.ano) ? `${p.siglaTipo} ${p.numero}/${p.ano}` : (p.billCode || ''),
              title: p.ementa || p.descricao || 'Proposição',
              summary: p.ementaDetalhada || p.ementa || '',
              relation: 'Assunto semelhante ao tema da demanda',
              status: (p.statusProposicao && p.statusProposicao.sigla) ? p.statusProposicao.sigla : (p.situacao || 'Em tramitação'),
            }));
            console.log('Top 3 PLs processados:', top3);
            setSimilarBills(top3);
          } catch (err) {
            console.error('Erro final ao buscar PLs:', err);
            // silencioso se falhar
          }
        }
      } catch (e) {
        setError('Erro ao carregar demanda.');
      } finally {
        setLoading(false);
      }
    }
    loadDemand();
  }, [id]);

  const handleSupport = async () => {
    try {
      await api.supportDemand(id);
      setIsSupported(true);
      setDemand(d => ({ ...d, supports: (d?.supports || 0) + 1 }));
    } catch (e) {
      // noop or show error UI
    }
  };

  if (loading) return <PageContainer><HeaderWhite /><ContentWrapper>Carregando...</ContentWrapper></PageContainer>;
  if (error || !demand) return <PageContainer><HeaderWhite /><ContentWrapper>{error || 'Demanda não encontrada.'}</ContentWrapper></PageContainer>;

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
              {demand.title}
              {demand.hash && <Hash>#{demand.hash}</Hash>}
            </Title>
            <CategoryTag $bgColor="#F5E6D3" $iconColor="#D89F66">
              <MdShield />
              {demand.status}
            </CategoryTag>
          </HeaderRow>
          
          <LocationRow>
            <MdLocationOn size={18} />
            {demand.location}
          </LocationRow>

          <SectionTitle>Resumo da demanda (gerado por Inteligência Artificial):</SectionTitle>
          <Text>{demand.summary}</Text>
          
          <SupportCount>
            <MdThumbUp size={18} />
            {(demand.supports || 0)} pessoas apoiaram esta demanda
          </SupportCount>
        </MainCard>

        <Grid>
          <Column>
            <SectionTitle>Linha do tempo</SectionTitle>
            <TimelineContainer>
              {(demand.timeline || []).map((item, index) => (
                <TimelineItem key={index} $active={item.active} $current={item.current}>
                  <TimelineTitle $active={item.active} $current={item.current}>
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
                <Text style={{ whiteSpace: 'pre-line' }}>{demand.communityReport?.summary}</Text>
              </ReportSection>
              
              <ReportSection>
                <ReportLabel>Impacto estimado:</ReportLabel>
                <Text>{demand.communityReport?.impact}</Text>
              </ReportSection>

              <DownloadLink href="#">
                <MdPictureAsPdf size={20} />
                Baixar relatório completo (PDF)
              </DownloadLink>

              <ReportSection>
                <ReportLabel>Órgãos contatados:</ReportLabel>
                <Text>{demand.communityReport?.organs}</Text>
              </ReportSection>

              <InfoGrid>
                <div>
                  <ReportLabel>Protocolo de envio:</ReportLabel>
                  <Text>{demand.communityReport?.protocol}</Text>
                </div>
                <div>
                  <ReportLabel>Status da resposta:</ReportLabel>
                  <Text style={{ color: '#D4A017', fontWeight: '600' }}>
                    {demand.communityReport?.responseStatus}
                  </Text>
                </div>
              </InfoGrid>
            </ReportCard>
          </Column>

          <Column>
            <SectionTitle>Apoiar Demanda</SectionTitle>
            <SupportButton onClick={handleSupport} $supported={isSupported} disabled={isSupported}>
              {isSupported ? <MdCheck size={24} /> : <MdThumbUp size={24} />}
              {isSupported ? 'Você apoiou essa demanda' : 'Apoiar essa demanda'}
            </SupportButton>

            <SectionTitle style={{ marginTop: '1rem' }}>Projetos de Leis Relacionados</SectionTitle>
            {(demand.relatedBills || []).map((bill, index) => (
              <BillCard key={index} onClick={() => navigate(`/discussion/${bill.id}`)}>
                <BillTitle>{bill.id} - {bill.title}</BillTitle>
                
                <ReportSection>
                  <ReportLabel style={{ fontSize: '0.9rem' }}>Resumo:</ReportLabel>
                  <BillSummary>{bill.summary}</BillSummary>
                </ReportSection>

                <ReportSection>
                  <ReportLabel style={{ fontSize: '0.9rem' }}>Relação:</ReportLabel>
                  <BillSummary>{bill.relation}</BillSummary>
                </ReportSection>

                <BillFooter>
                  <BillTag>{bill.status}</BillTag>
                  <BillLink>Ver detalhes &gt;</BillLink>
                </BillFooter>
              </BillCard>
            ))}

            {similarBills.length > 0 && (
              similarBills.map((bill, index) => (
                <BillCard key={`sim-${index}`} onClick={() => navigate(`/discussion/${bill.id}`)}>
                  <BillHeader>
                    <BillTitle>{bill.billCode || bill.id} - {bill.title}</BillTitle>
                    <BillTag>{bill.status}</BillTag>
                  </BillHeader>
                  {bill.summary && (
                    <ReportSection>
                      <ReportLabel style={{ fontSize: '0.9rem' }}>Resumo:</ReportLabel>
                      <BillSummary>{bill.summary}</BillSummary>
                    </ReportSection>
                  )}
                  <ReportSection>
                    <ReportLabel style={{ fontSize: '0.9rem' }}>Relação:</ReportLabel>
                    <BillSummary>{bill.relation}</BillSummary>
                  </ReportSection>
                </BillCard>
              ))
            )}
          </Column>
        </Grid>
      </ContentWrapper>
    </PageContainer>
  );
};

export default DemandDetail;
