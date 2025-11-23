import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { MdNotificationsNone, MdLogout } from 'react-icons/md';
import logo from '../assets/pink_logo.svg';

const Header = styled.header`
  background: white;
  padding: 0 2rem;
  height: 80px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const Spacer = styled.div`
  height: 80px;
  width: 100%;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-title);
  font-size: 1.5rem;
  font-weight: 800;
  color: #F27D70;

  img {
    width: 30px;
    height: 30px;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: #4A2525;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #F27D70;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  cursor: pointer;
  color: #666;

  svg {
    font-size: 1.2rem;
    transition: color 0.2s;

    &:hover {
      color: #F27D70;
    }
  }
`;

const Avatar = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #F27D70;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  img {
    width: 60%;
    height: 60%;
    object-fit: contain;
    filter: brightness(0) invert(1);
  }
`;

const AvatarContainer = styled.div`
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 120%;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  padding: 0.5rem;
  min-width: 150px;
  display: ${props => props.isOpen ? 'block' : 'none'};
  z-index: 100;
  border: 1px solid #eee;
`;

const DropdownItem = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #4A2525;
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.2s;
  font-family: var(--font-body);

  &:hover {
    background: #FFF5F2;
    color: #F27D70;
  }
`;

export default function HeaderWhite() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <>
            <Header>
                <Logo>
                    <img src={logo} alt="Coral" />
                    Coral
                </Logo>
                <UserProfile>
                    <Nav>
                        <NavLink to="/community">Comunidade</NavLink>
                        <NavLink to="/demands">Demandas</NavLink>
                        <NavLink to="/discussions">Discussões</NavLink>
                        <NavLink to="/profile">Meu Perfil</NavLink>
                    </Nav>
                    <MdNotificationsNone />
                    <AvatarContainer>
                        <Avatar onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                            <img src={logo} alt="User" />
                        </Avatar>
                        <DropdownMenu isOpen={isDropdownOpen}>
                            <DropdownItem onClick={handleLogout}>
                                <MdLogout />
                                Sair da conta
                            </DropdownItem>
                        </DropdownMenu>
                    </AvatarContainer>
                </UserProfile>
            </Header>
            <Spacer />
        </>
    );
}
