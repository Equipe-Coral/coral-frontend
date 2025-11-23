import styled from 'styled-components';
import PropTypes from 'prop-types';

const CardWrapper = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const IconWrapper = styled.div`
  font-size: 2.5rem;
  color: #F27D70;
  margin-bottom: 1.5rem;
  
  svg {
    display: block;
  }
`;

const Title = styled.h3`
  font-family: var(--font-title);
  font-size: 1.25rem;
  font-weight: 800;
  color: #4A2525;
  margin-bottom: 0.75rem;
  line-height: 1.2;
`;

const Description = styled.p`
  font-size: 0.95rem;
  color: #666;
  line-height: 1.5;
`;

export default function ActionCard({ icon, title, description, onClick }) {
  return (
    <CardWrapper onClick={onClick}>
      <div>
        <IconWrapper>
          {icon}
        </IconWrapper>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </div>
    </CardWrapper>
  );
}

ActionCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
