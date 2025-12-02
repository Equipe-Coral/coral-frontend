import styled from 'styled-components';
import { FaEye, FaEyeSlash, FaUser, FaLock } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import logo from '../assets/logo.svg';

const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: var(--background);
`;

const LeftPanel = styled.div`
  width: 40%;
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: var(--white);
  padding: 2rem 2rem;
  
  > * {
    z-index: 1;
  }
`;

const WaveBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 90%;
  height: 120%;
  z-index: 0;
  
  svg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const LogoContainer = styled.div`
  position: absolute;
  top: 3rem;
  left: 3rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 2rem;
  font-weight: 700;
  color: var(--white);
  font-family: var(--font-title);
  
  img {
    height: 50px;
    width: auto;
  }
`;

const WelcomeText = styled.div`
  text-align: left;
  max-width: 600px;
  width: 100%;
`;

const Title = styled.h1`
  font-family: var(--font-title);
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  line-height: 1.1;
`;

const Subtitle = styled.p`
  font-size: 2rem;
  font-weight: 400;
  opacity: 0.9;
  font-family: var(--font-title);
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #FFF5F2;
  padding: 2rem 2rem 2rem 0rem;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormTitle = styled.h2`
  font-family: var(--font-title);
  font-size: 2.5rem;
  color: #4A2525;
  margin-bottom: 1rem;
  text-align: left;
  font-weight: 800;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 700;
  color: #4A2525;
  font-size: 1.1rem;
  margin-left: 0.5rem;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: var(--white);
  border-radius: 50px; /* Pill shape */
  padding: 1rem 1.5rem;
  box-shadow: none;
  border: 1px solid transparent;
  
  &:focus-within {
    border-color: #F27D70;
  }

  svg {
    color: #F27D70; /* Coral color for icons */
    font-size: 1.2rem;
    margin-right: 1rem;
  }
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  color: var(--text);
  background: transparent;
  
  &::placeholder {
    color: #ccc;
  }
`;

const TogglePassword = styled.div`
  cursor: pointer;
  color: #ccc;
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
  
  svg {
    margin-right: 0;
    color: #ccc;
  }
  
  &:hover svg {
    color: var(--text);
  }
`;

const ForgotPassword = styled.a`
  color: #F27D70; /* Coral color */
  font-size: 0.9rem;
  text-decoration: underline;
  cursor: pointer;
  align-self: flex-start;
  margin-left: 0.5rem;
  font-weight: 500;
  
  &:hover {
    color: #E06C5F;
  }
`;

const Button = styled.button`
  background-color: #F27D70;
  color: var(--white);
  border: none;
  padding: 1rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 700;
  width: 100%;
  transition: background-color 0.2s;
  box-shadow: 0 4px 15px rgba(242, 125, 112, 0.4);
  font-family: var(--font-title);
  margin-top: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #E06C5F;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: var(--text);
  font-size: 1rem;
  margin: 0.5rem 0;
  font-weight: 600;
  
  &::before, &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #ccc;
  }
  
  &::before {
    margin-right: .5em;
  }
  
  &::after {
    margin-left: .5em;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: #F27D70;
  border: 1px solid #F27D70;
  box-shadow: none;
  margin-top: 0;
  
  &:hover {
    background-color: rgba(242, 125, 112, 0.05);
  }
`;

const ErrorMessage = styled.div`
  background-color: #ffe6e6;
  color: #d32f2f;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  text-align: center;
  border: 1px solid #ffcccc;
`;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.login(email, password);
      login(response.token);
      navigate('/community');
    } catch (err) {
      setError(err.message || 'Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LeftPanel>
        <WaveBackground>
          <svg width="100%" height="100%" viewBox="0 0 712 835" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M-58 835L-58 -717H369.075C369.075 -717 76.8203 -343.099 460.591 -18.8255C1026.26 459.147 460.591 835 460.591 835L-58 835Z" fill="#F7A7A0" />
            <path d="M-62 -717L-62 835L558.719 835C558.719 835 364.761 700.669 558.719 482.529C1085.73 -110.186 -226.143 2.60461 457.15 -717H-62Z" fill="url(#paint0_linear_35_537)" fillOpacity="0.63" />
            <defs>
              <linearGradient id="paint0_linear_35_537" x1="313.647" y1="835" x2="313.647" y2="-717" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F05F51" />
                <stop offset="1" stopColor="#F99772" />
              </linearGradient>
            </defs>
          </svg>
        </WaveBackground>
        <LogoContainer>
          <img src={logo} alt="Coral Logo" />
          Coral
        </LogoContainer>
        <WelcomeText>
          <Title>Bem-Vindo ao Coral!</Title>
          <Subtitle>Sua voz na comunidade</Subtitle>
        </WelcomeText>
      </LeftPanel>
      <RightPanel>
        <FormContainer>
          <FormTitle>Entrar na minha conta</FormTitle>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <InputGroup>
            <Label>E-mail</Label>
            <InputWrapper>
              <FaUser />
              <Input 
                type="email" 
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </InputWrapper>
          </InputGroup>

          <InputGroup>
            <Label>Senha</Label>
            <InputWrapper>
              <FaLock />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                disabled={loading}
              />
              <TogglePassword onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </TogglePassword>
            </InputWrapper>
            <ForgotPassword>Esqueci minha senha</ForgotPassword>
          </InputGroup>

          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>

          <Divider>ou</Divider>

          <SecondaryButton onClick={() => navigate('/register')}>Criar conta</SecondaryButton>
        </FormContainer>
      </RightPanel>
    </LoginContainer>
  );
}
