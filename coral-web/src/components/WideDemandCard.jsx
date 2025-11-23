import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';
import { MdThumbUp, MdLocationOn } from 'react-icons/md';

const CardWrapper = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  margin-bottom: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const IconContainer = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: ${props => props.$bgColor || '#FFF4E6'};
  color: ${props => props.$iconColor || '#F27D70'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  flex-shrink: 0;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #999;
  font-size: 0.8rem;
`;

const Title = styled.h3`
  font-family: var(--font-title);
  font-size: 1.25rem;
  color: var(--text);
  margin: 0;
`;

const Description = styled.p`
  color: var(--text-light);
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 0.5rem;
`;

const Supports = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #F27D70;
  font-weight: 700;
  font-size: 0.9rem;
`;

const TagsColumn = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

const CategoryTag = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 700;
  background-color: white;
  border: 1px solid ${props => props.$iconColor || '#F27D70'};
  color: ${props => props.$iconColor || '#F27D70'};
  display: flex;
  align-items: center;
  gap: 0.25rem;
  white-space: nowrap;

  svg {
    font-size: 0.9rem;
  }
`;

const StatusTag = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 700;
  background-color: #FFF3E0;
  color: #F57C00;
  white-space: nowrap;
`;

export default function WideDemandCard({ 
  icon, 
  title, 
  description, 
  location, 
  supports, 
  category, 
  categoryColors, 
  status,
  onClick 
}) {
  return (
    <CardWrapper onClick={onClick}>
      <IconContainer $bgColor={categoryColors?.bg} $iconColor={categoryColors?.icon}>
        {icon}
      </IconContainer>
      
      <Content>
        <Location>
          <MdLocationOn />
          {location}
        </Location>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <Supports>
          <MdThumbUp />
          {supports} apoios
        </Supports>
      </Content>

      <TagsColumn>
        <CategoryTag $iconColor={categoryColors?.icon}>
          {icon}
          {category}
        </CategoryTag>
        <StatusTag>{status}</StatusTag>
      </TagsColumn>
    </CardWrapper>
  );
}

WideDemandCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  supports: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  categoryColors: PropTypes.shape({
    bg: PropTypes.string,
    icon: PropTypes.string
  }),
  status: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
