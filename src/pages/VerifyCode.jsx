import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import logo from '../assets/logo.svg';

const VerifyContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: var(--background);
`;

const LeftPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  position: relative;
  overflow: hidden;
`;

const WaveBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: var(--font-title);
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--white);
  z-index: 1;
  margin-bottom: 2rem;

  img {
    width: 60px;
    height: 60px;
  }
`;

const WelcomeText = styled.div`
  z-index: 1;
  text-align: center;
  color: var(--white);
`;

const Title = styled.h1`
  font-family: var(--font-title);
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  font-weight: 300;
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FormTitle = styled.h2`
  font-family: var(--font-title);
  font-size: 2.5rem;
  color: #4A2525;
  margin-bottom: 0.5rem;
  text-align: center;
  font-weight: 800;
`;

const SubHeader = styled.p`
  font-family: var(--font-title);
  font-size: 1.1rem;
  color: #4A2525;
  margin-top: -1.5rem;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 400;
  line-height: 1.5;
`;

const CodeInputContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
`;

const CodeInput = styled.input`
  width: 60px;
  height: 70px;
  border-radius: 15px;
  border: 2px solid #E0E0E0;
  background-color: var(--white);
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  color: #4A2525;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #F27D70;
    box-shadow: 0 0 0 3px rgba(242, 125, 112, 0.1);
  }

  &::placeholder {
    color: #E0E0E0;
  }

  /* Remove arrows from number input */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type=number] {
    -moz-appearance: textfield;
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

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const ResendText = styled.p`
  text-align: center;
  color: #666;
  font-size: 0.95rem;
  margin-top: 1rem;

  button {
    background: none;
    border: none;
    color: #F27D70;
    font-weight: 700;
    cursor: pointer;
    text-decoration: underline;
    padding: 0;
    margin-left: 0.25rem;

    &:hover {
      color: #E06C5F;
    }

    &:disabled {
      color: #ccc;
      cursor: not-allowed;
    }
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

export default function VerifyCode() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const { login } = useAuth();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }

    if (!/^\d*$/.test(value)) {
      return;
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigator.clipboard.readText().then(text => {
        const digits = text.replace(/\D/g, '').slice(0, 6).split('');
        const newCode = [...code];
        digits.forEach((digit, i) => {
          if (i < 6) {
            newCode[i] = digit;
          }
        });
        setCode(newCode);
        const lastIndex = Math.min(digits.length, 5);
        inputRefs.current[lastIndex]?.focus();
      });
    }
  };

  const handleSubmit = async () => {
    const fullCode = code.join('');
    if (fullCode.length === 6) {
      setLoading(true);
      setError('');

      try {
        const response = await api.verifyCode(email, fullCode);
        login(response.token);
        navigate('/community');
      } catch (err) {
        setError(err.message || 'Código inválido. Tente novamente.');
        setCode(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      } finally {
        setLoading(false);
      }
    }
  };

  const handleResend = async () => {
    setLoading(true);
    setError('');

    try {
      await api.resendCode(email);
      setCode(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch (err) {
      setError(err.message || 'Erro ao reenviar código.');
    } finally {
      setLoading(false);
    }
  };

  const isCodeComplete = code.every(digit => digit !== '');

  return (
    <VerifyContainer>
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
          <FormTitle>Criar uma conta</FormTitle>
          <SubHeader>
            Agora é só confirmar o código que foi<br />
            enviado para o seu WhatsApp
          </SubHeader>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <CodeInputContainer>
            {code.map((digit, index) => (
              <CodeInput
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="number"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                placeholder="0"
                autoFocus={index === 0}
                disabled={loading}
              />
            ))}
          </CodeInputContainer>

          <Button onClick={handleSubmit} disabled={!isCodeComplete || loading}>
            {loading ? 'Verificando...' : 'Enviar'}
          </Button>

          <ResendText>
            Não recebeu o código?
            <button onClick={handleResend} disabled={loading}>Reenviar</button>
          </ResendText>
        </FormContainer>
      </RightPanel>
    </VerifyContainer>
  );
}
