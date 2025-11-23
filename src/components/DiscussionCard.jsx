import styled from 'styled-components';
import PropTypes from 'prop-types';
import { MdChevronRight } from 'react-icons/md';

const CardWrapper = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1rem 1.25rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.h4`
  font-family: var(--font-title);
  font-size: 0.95rem;
  font-weight: 700;
  color: #4A2525;
  margin-bottom: 0.25rem;
`;

const Description = styled.p`
  font-size: 0.8rem;
  color: #666;
  line-height: 1.4;
`;

const Meta = styled.div`
  font-size: 0.75rem;
  color: #999;
  margin-top: 0.35rem;
`;

const Arrow = styled.div`
  color: #F27D70;
  font-size: 1.25rem;
  font-weight: bold;
  margin-left: 1rem;
`;

export default function DiscussionCard({ title, description, meta, onClick }) {
    // don't forget to add: import { MdChevronRight } from 'react-icons/md';

    return (
      <CardWrapper onClick={onClick}>
        <Content>
          <Title>{title}</Title>
          <Description>{description}</Description>
          <Meta>{meta}</Meta>
        </Content>
        <Arrow><MdChevronRight /></Arrow>
      </CardWrapper>
    );
}

DiscussionCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    meta: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};
