import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { MdErrorOutline } from 'react-icons/md';
import HeaderWhite from '../components/HeaderWhite';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #FAF9F8;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  color: #4A2525;
`;

const IconWrapper = styled.div`
  font-size: 5rem;
  color: #F27D70;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-family: var(--font-title);
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
  max-width: 400px;
`;

const Button = styled.button`
  background-color: #F27D70;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #E06C5F;
  }
`;

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <HeaderWhite />
      <Content>
        <IconWrapper>
          <MdErrorOutline />
        </IconWrapper>
        <Title>Página não encontrada</Title>
        <Message>
          Ops! A página que você está procurando não existe ou foi movida.
        </Message>
        <Button onClick={() => navigate('/community')}>
          Voltar para a Comunidade
        </Button>
      </Content>
    </PageContainer>
  );
}
