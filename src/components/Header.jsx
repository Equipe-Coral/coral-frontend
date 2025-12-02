import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
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

const NavLink = styled(Link)`
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

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Button = styled(Link)`
  padding: 0.6rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;
  
  ${props => props.$variant === 'primary' ? `
    background: white;
    color: var(--primary);
    &:hover {
      background: #f5f5f5;
    }
  ` : `
    background: transparent;
    color: white;
    border: 2px solid white;
    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  `}
`;

export default function Header() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    return (
        <HeaderContainer>
            <Logo>
                <img src={logo} alt="Coral Logo" />
                Coral
            </Logo>
            <Actions>
                {isAuthenticated ? (
                    <>
                        <Nav>
                            <NavLink to="/">Início</NavLink>
                            <NavLink to="/demands">Demandas</NavLink>
                            <NavLink to="/community">Comunidade</NavLink>
                            <NavLink to="/profile">Meu Perfil</NavLink>
                        </Nav>
                        <IconWrapper onClick={() => navigate('/profile')}>
                            <FaBell />
                        </IconWrapper>
                        <IconWrapper onClick={() => navigate('/profile')}>
                            <FaUserCircle />
                        </IconWrapper>
                    </>
                ) : (
                    <AuthButtons>
                        <Button to="/login" $variant="outline">Entrar</Button>
                        <Button to="/register" $variant="primary">Cadastrar</Button>
                    </AuthButtons>
                )}
            </Actions>
        </HeaderContainer>
    );
}