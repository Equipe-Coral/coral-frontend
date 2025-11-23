import styled from 'styled-components';
import { FaUser, FaLock, FaPhone, FaIdCard, FaEye, FaEyeSlash, FaMapMarkerAlt, FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../assets/logo.svg';

const RegisterContainer = styled.div`
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
  
  /* Content on top of background */
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
  text-align: center;
  font-weight: 800;
`;

const SubHeader = styled.p`
  font-family: var(--font-title);
  font-size: 1.2rem;
  color: #4A2525;
  margin-top: -2.5rem;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 500;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
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

const Select = styled.select`
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  color: var(--text);
  background: transparent;
  cursor: pointer;
  
  &::placeholder {
    color: #ccc;
  }
  
  option {
    color: var(--text);
    background: var(--white);
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

const ErrorMessage = styled.span`
  color: #E06C5F;
  font-size: 0.85rem;
  margin-top: 0.25rem;
  margin-left: 0.5rem;
  display: block;
`;

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [cities, setCities] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    password: '',
    confirmPassword: '',
    uf: '',
    city: '',
    address: '',
    number: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (formData.uf) {
      setFormData(prev => ({ ...prev, city: '' }));

      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${formData.uf}/municipios`)
        .then(response => response.json())
        .then(data => {
          const cityNames = data.map(city => city.nome).sort();
          setCities(cityNames);
        })
        .catch(error => {
          console.error('Erro ao buscar cidades:', error);
          setCities([]);
        });
    } else {
      setCities([]);
    }
  }, [formData.uf]);

  // Format phone number as (00) 00000-0000
  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  // Format CPF as 000.000.000-00
  const formatCPF = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
    if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
  };

  const validateCPF = (cpf) => {
    const numbers = cpf.replace(/\D/g, '');

    if (numbers.length !== 11) return false;

    if (/^(\d)\1+$/.test(numbers)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(numbers.charAt(i)) * (10 - i);
    }
    let checkDigit = 11 - (sum % 11);
    if (checkDigit >= 10) checkDigit = 0;
    if (checkDigit !== parseInt(numbers.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(numbers.charAt(i)) * (11 - i);
    }
    checkDigit = 11 - (sum % 11);
    if (checkDigit >= 10) checkDigit = 0;
    if (checkDigit !== parseInt(numbers.charAt(10))) return false;

    return true;
  };

  const handleChange = (field, value) => {
    let formattedValue = value;

    if (field === 'phone') {
      formattedValue = formatPhone(value);
    } else if (field === 'cpf') {
      formattedValue = formatCPF(value);
    }

    setFormData({ ...formData, [field]: formattedValue });

    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validateStep1 = () => {
    const newErrors = {};

    const nameParts = formData.name.trim().split(/\s+/);
    if (nameParts.length < 2) {
      newErrors.name = 'Digite seu nome completo (nome e sobrenome)';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Digite seu e-mail';
    }

    const phoneNumbers = formData.phone.replace(/\D/g, '');
    if (phoneNumbers.length < 11) {
      newErrors.phone = 'Digite um celular válido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!validateCPF(formData.cpf)) {
      newErrors.cpf = 'CPF inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Digite uma senha';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};

    if (!formData.uf) {
      newErrors.uf = 'Selecione o estado';
    }

    if (!formData.city) {
      newErrors.city = 'Selecione a cidade';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Digite seu endereço';
    }

    if (!formData.number.trim()) {
      newErrors.number = 'Digite o número';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
    } else if (step === 2) {
      if (validateStep2()) {
        setStep(3);
      }
    } else {
      if (validateStep3()) {
        console.log('Form submitted', formData);
        navigate('/verify-code');
      }
    }
  };

  return (
    <RegisterContainer>
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
          {step === 2 && <SubHeader>Estamos quase lá!</SubHeader>}
          {step === 3 && <SubHeader>Última etapa antes de se juntar!</SubHeader>}

          {step === 1 ? (
            <>
              <InputGroup>
                <Label>Nome completo</Label>
                <InputWrapper>
                  <FaUser />
                  <Input
                    type="text"
                    placeholder="Digite seu nome completo"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                  />
                </InputWrapper>
                {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
              </InputGroup>

              <InputGroup>
                <Label>E-mail</Label>
                <InputWrapper>
                  <FaUser />
                  <Input
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </InputWrapper>
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
              </InputGroup>

              <InputGroup>
                <Label>Celular</Label>
                <InputWrapper>
                  <FaPhone />
                  <Input
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    maxLength={15}
                  />
                </InputWrapper>
                {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
              </InputGroup>

              <Button onClick={handleNext}>Próximo</Button>
            </>
          ) : step === 2 ? (
            <>
              <InputGroup>
                <Label>CPF</Label>
                <InputWrapper>
                  <FaIdCard />
                  <Input
                    type="text"
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={(e) => handleChange('cpf', e.target.value)}
                    maxLength={14}
                  />
                </InputWrapper>
                {errors.cpf && <ErrorMessage>{errors.cpf}</ErrorMessage>}
              </InputGroup>

              <InputGroup>
                <Label>Senha</Label>
                <InputWrapper>
                  <FaLock />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Crie uma senha"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                  />
                  <TogglePassword onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </TogglePassword>
                </InputWrapper>
                {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
              </InputGroup>

              <InputGroup>
                <Label>Confirmar senha</Label>
                <InputWrapper>
                  <FaLock />
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirme sua senha"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  />
                  <TogglePassword onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </TogglePassword>
                </InputWrapper>
                {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
              </InputGroup>

              <Button onClick={handleNext}>Próximo</Button>
            </>
          ) : step === 3 ? (
            <>
              <InputRow>
                <InputGroup>
                  <Label>UF</Label>
                  <InputWrapper>
                    <FaMapMarkerAlt />
                    <Select
                      value={formData.uf}
                      onChange={(e) => handleChange('uf', e.target.value)}
                    >
                      <option value="">UF</option>
                      <option value="AC">AC</option>
                      <option value="AL">AL</option>
                      <option value="AP">AP</option>
                      <option value="AM">AM</option>
                      <option value="BA">BA</option>
                      <option value="CE">CE</option>
                      <option value="DF">DF</option>
                      <option value="ES">ES</option>
                      <option value="GO">GO</option>
                      <option value="MA">MA</option>
                      <option value="MT">MT</option>
                      <option value="MS">MS</option>
                      <option value="MG">MG</option>
                      <option value="PA">PA</option>
                      <option value="PB">PB</option>
                      <option value="PR">PR</option>
                      <option value="PE">PE</option>
                      <option value="PI">PI</option>
                      <option value="RJ">RJ</option>
                      <option value="RN">RN</option>
                      <option value="RS">RS</option>
                      <option value="RO">RO</option>
                      <option value="RR">RR</option>
                      <option value="SC">SC</option>
                      <option value="SP">SP</option>
                      <option value="SE">SE</option>
                      <option value="TO">TO</option>
                    </Select>
                  </InputWrapper>
                  {errors.uf && <ErrorMessage>{errors.uf}</ErrorMessage>}
                </InputGroup>

                <InputGroup>
                  <Label>Cidade</Label>
                  <InputWrapper>
                    <FaMapMarkerAlt />
                    <Select
                      value={formData.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                      disabled={!formData.uf}
                    >
                      <option value="">Selecione a cidade</option>
                      {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </Select>
                  </InputWrapper>
                  {errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}
                </InputGroup>
              </InputRow>

              <InputGroup>
                <Label>Endereço</Label>
                <InputWrapper>
                  <FaHome />
                  <Input
                    type="text"
                    placeholder="Digite seu endereço (rua e bairro)"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                  />
                </InputWrapper>
                {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
              </InputGroup>

              <InputGroup>
                <Label>Número/Complemento</Label>
                <InputWrapper>
                  <FaHome />
                  <Input
                    type="text"
                    placeholder="Digite o número e/ou complemento"
                    value={formData.number}
                    onChange={(e) => handleChange('number', e.target.value)}
                  />
                </InputWrapper>
                {errors.number && <ErrorMessage>{errors.number}</ErrorMessage>}
              </InputGroup>

              <Button onClick={handleNext}>Cadastrar</Button>
            </>
          ) : null}

          <Divider>ou</Divider>

          <SecondaryButton onClick={() => step === 1 ? navigate('/login') : setStep(step - 1)}>
            {step === 1 ? 'Entrar' : 'Voltar'}
          </SecondaryButton>
        </FormContainer>
      </RightPanel>
    </RegisterContainer>
  );
}
