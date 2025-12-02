import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';
import { MdShield, MdCheckCircle, MdHourglassEmpty, MdGavel, MdLocalHospital, MdSchool, MdDirectionsBus, MdEco, MdAttachMoney, MdDiversity3, MdComputer } from 'react-icons/md';

const CardWrapper = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const AuthorInfo = styled.div`
  font-size: 0.85rem;
  color: #999;
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const Tags = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const Tag = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  border: 1px solid ${props => props.$borderColor || 'transparent'};
  background-color: ${props => props.$bgColor || '#f5f5f5'};
  color: ${props => props.$color || '#666'};

  svg {
    font-size: 0.9rem;
  }
`;

const Title = styled.h3`
  font-family: var(--font-title);
  font-size: 1.25rem;
  color: var(--text);
  margin: 0;
`;

const Description = styled.p`
  color: var(--text-light);
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
`;

export default function WideDiscussionCard({
  title,
  description,
  author,
  organ,
  category,
  status,
  onClick
}) {
  const getCategoryIcon = (category) => {
    const c = (category || '').toLowerCase();
    if (c.includes('segurança')) return <MdShield />;
    if (c.includes('saúde') || c.includes('saude')) return <MdLocalHospital />;
    if (c.includes('educação') || c.includes('educacao')) return <MdSchool />;
    if (c.includes('transporte')) return <MdDirectionsBus />;
    if (c.includes('ambiente')) return <MdEco />;
    if (c.includes('economia')) return <MdAttachMoney />;
    if (c.includes('direitos humanos')) return <MdDiversity3 />;
    if (c.includes('tecnologia')) return <MdComputer />;
    return <MdGavel />;
  };

  const getStatusStyle = (status) => {
    const s = (status || '').toLowerCase();
    if (s.includes('aprov')) {
      return { bg: '#E8F5E9', color: '#2E7D32', icon: <MdCheckCircle /> };
    }
    if (s.includes('tramita')) {
      return { bg: '#FAEFE0', color: '#DE9331', icon: <MdHourglassEmpty /> };
    }
    return { bg: '#E0E0E0', color: '#616161', icon: <MdHourglassEmpty /> };
  };

  const statusStyle = getStatusStyle(status);

  return (
    <CardWrapper onClick={onClick}>
      <Header>
        <AuthorInfo>
          <span>Autor(es): {author}</span>
          <span>Órgão: {organ}</span>
        </AuthorInfo>
        <Tags>
          <Tag $borderColor="#D89F66" $color="#D89F66" $bgColor="white">
            {getCategoryIcon(category)}
            {category}
          </Tag>
          <Tag $bgColor={statusStyle.bg} $color={statusStyle.color}>
            {statusStyle.icon}
            {status}
          </Tag>
        </Tags>
      </Header>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </CardWrapper>
  );
}

WideDiscussionCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  organ: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
