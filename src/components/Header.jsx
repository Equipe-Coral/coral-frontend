import styled from 'styled-components';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import logo from '../assets/logo.svg';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  padding: 1.5rem 4rem;
  background-color: transparent;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--white);
  margin-right: auto;
  
  img {
    height: 40px;
    width: auto;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  text-decoration: none;
  color: var(--white);
  font-weight: 500;
  font-size: 0.9rem;
  opacity: 0.9;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  color: var(--white);
  font-size: 1.2rem;

  svg {
    cursor: pointer;
  }
`;

const IconWrapper = styled.div`
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 1;
  }
`;

export default function Header() {
    return (
        <HeaderContainer>
            <Logo>
                <img src={logo} alt="Coral Logo" />
                Coral
            </Logo>
            <Actions>
                <Nav>
                    <NavLink href="#">Início</NavLink>
                    <NavLink href="#">Demandas</NavLink>
                    <NavLink href="#">Comunidade</NavLink>
                    <NavLink href="#">Meu Perfil</NavLink>
                </Nav>
                {/*Adicionar hover*/}
                <>
                    <IconWrapper>
                        <FaBell />
                    </IconWrapper>
                    <IconWrapper>
                        <FaUserCircle />
                    </IconWrapper>
                </>
            </Actions>
        </HeaderContainer>
    );
}