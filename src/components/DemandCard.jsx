import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';
import { MdThumbUp } from 'react-icons/md';

const CardWrapper = styled.div`
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-4px);
  }
`;

const TagsRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  justify-content: flex-end; /* Aligned to the right as requested */
`;

const Tag = styled.span`
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

  svg {
    font-size: 0.9rem; /* Adjust icon size in tag */
    color: ${props => props.$iconColor || 'inherit'};
  }
`;

const StatusDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${props => props.$color || '#F27D70'};
`;

const MainContent = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex: 1;
`;

const IconContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${props => props.$bgColor || '#FFF4E6'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
  color: ${props => props.$iconColor || '#4A2525'};
  
  svg {
    color: ${props => props.$iconColor || '#4A2525'};
    opacity: 1;
  }
`;

const TextContent = styled.div`
  flex: 1;
`;

const Title = styled.h4`
  font-family: var(--font-title);
  font-size: 1.1rem;
  font-weight: 800;
  color: #4A2525;
  margin-bottom: 0.5rem;
  line-height: 1.2;
`;

const Description = styled.p`
  font-size: 0.85rem;
  color: #666;
  line-height: 1.4;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #F0F0F0;
`;

const Supports = styled.span`
  font-size: 0.8rem;
  color: #999;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  svg {
    font-size: 0.9rem;
    color: #999;
  }
`;

const ViewLink = styled.span`
  color: #F27D70;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

export default function DemandCard({
  icon,
  title,
  description,
  status,
  category,
  categoryColors, 
  onClick
}) {
  const getStatusColor = (s) => {
    if (s === 'enviado') return '#FFB300';
    if (s === 'aberto') return '#4CAF50';
    return '#F44336';
  };

  const getStatusText = (s) => {
    if (s === 'enviado') return 'Em Análise';
    if (s === 'aberto') return 'Aberto';
    return 'Concluído';
  };

  const statusColor = getStatusColor(status);
  const catColors = categoryColors || { bg: '#FFF4E6', icon: '#F27D70' };

  return (
    <CardWrapper onClick={onClick}>
      <TagsRow>
        <Tag $bgColor={catColors.bg} $iconColor={catColors.icon}>
          {icon}
          {category}
        </Tag>
        <Tag $bgColor={statusColor + '20'} style={{ color: statusColor }}>
          <StatusDot $color={statusColor} />
          {getStatusText(status)}
        </Tag>
      </TagsRow>

      <MainContent>
        <IconContainer $bgColor={catColors.bg} $iconColor={catColors.icon}>
          {icon}
        </IconContainer>
        <TextContent>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </TextContent>
      </MainContent>

      <Footer>
        <Supports>
          <MdThumbUp />
          125 apoios
        </Supports>
        <ViewLink>Ver detalhes</ViewLink>
      </Footer>
    </CardWrapper>
  );
}

DemandCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  categoryColors: PropTypes.shape({
    bg: PropTypes.string,
    icon: PropTypes.string
  }),
  onClick: PropTypes.func,
};
