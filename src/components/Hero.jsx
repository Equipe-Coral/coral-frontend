import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import homeIllustration from '../assets/teste.svg';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  background-color: var(--white);
`;

const BackgroundLayer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 85%;
  height: 100%;
  z-index: 0;
  
  svg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const WaveBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 35vh;
  z-index: 2;
  
  svg {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const IllustrationContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 50%;
  max-width: 850px;
  z-index: 1;
  pointer-events: none;
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }

  @media (max-width: 1024px) {
    position: relative;
    width: 100%;
    max-width: 100%;
    left: auto;
    bottom: auto;
    margin-bottom: 2rem;
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 80px;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  z-index: 3;

  @media (max-width: 1024px) {
    flex-direction: column-reverse;
    padding: 2rem;
    justify-content: center;
    text-align: center;
  }
`;

const TextContainer = styled.div`
  flex: 0.8;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 4rem;
  z-index: 3;
  max-width: 600px;

  @media (max-width: 1024px) {
    padding-left: 0;
    margin-bottom: 2rem;
    max-width: 100%;
    align-items: center;
  }
`;

const Title = styled.h1`
  font-family: var(--font-title);
  font-size: 3rem;
  font-weight: 700;
  color: var(--text);
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: var(--text-light);
  line-height: 1.6;
  max-width: 500px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: var(--white);
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  margin-top: 1rem;
  width: 100%;
  max-width: 500px;

  input {
    flex: 1;
    border: none;
    outline: none;
    padding: 0.8rem;
    font-size: 1rem;
    color: var(--text);
    
    &::placeholder {
      color: #ccc;
    }
  }

  svg {
    color: var(--primary);
    font-size: 1.2rem;
    cursor: pointer;
  }
`;

const Button = styled.button`
  background-color: var(--primary);
  color: var(--white);
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 1rem;
  width: 100%;
  max-width: 500px;
  transition: background-color 0.2s;
  box-shadow: 0 4px 15px rgba(242, 125, 112, 0.3);
  font-family: var(--font-title);

  &:hover {
    background-color: var(--primary-hover);
  }

  @media (max-width: 1024px) {
    margin: 1rem auto 0;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0rem;
`;

export default function Hero() {
    const navigate = useNavigate();

    const handleInteraction = () => {
        navigate('/login');
    };

    return (
        <HeroSection>
            <BackgroundLayer>
                <svg width="100%" height="100%" viewBox="0 0 1376 835" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0H1376V835H826.435C771.778 835 717.421 826.926 665.124 811.04L609.49 794.141C575.763 783.896 545.343 764.919 521.31 739.133L122.567 311.287C43.7989 226.769 0 115.532 0 0Z" fill="#FFF0ED" />
                </svg>
            </BackgroundLayer>
            <WaveBackground>
                <svg width="100%" height="100%" viewBox="0 0 1366 303" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0H1366V168.057C1366 168.057 1036.91 53.0527 751.499 204.069C330.809 426.664 0 204.069 0 204.069V0Z" fill="#F7A7A0" />
                    <path d="M1366 0H0V243.646C0 243.646 118.232 167.513 310.229 243.646C831.91 450.51 732.637 -64.4299 1366 203.778V0Z" fill="url(#paint0_linear_27_530)" fillOpacity="0.63" />
                    <defs>
                        <linearGradient id="paint0_linear_27_530" x1="0" y1="147.45" x2="1366" y2="147.45" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#F05F51" />
                            <stop offset="1" stopColor="#F99772" />
                        </linearGradient>
                    </defs>
                </svg>
            </WaveBackground>
            <IllustrationContainer>
                <img src={homeIllustration} alt="City illustration with community" />
            </IllustrationContainer>
            <Content>
                <TextContainer>
                    <Title>Sua voz transforma a comunidade.</Title>
                    <Description>
                        Coral conecta você ao poder público, facilitando acesso as discussões legislativas e governamentais. Sua voz faz a diferença.
                    </Description>
                    <ButtonContainer>
                        <SearchContainer onClick={handleInteraction}>
                            <input
                                type="text"
                                placeholder="Pesquise por leis, tópicos..."
                                onKeyDown={(e) => e.key === 'Enter' && handleInteraction()}
                            />
                            <FaSearch />
                        </SearchContainer>
                        <Button onClick={handleInteraction}>Relatar demanda</Button>
                    </ButtonContainer>
                </TextContainer>
            </Content>
        </HeroSection>
    );
}
