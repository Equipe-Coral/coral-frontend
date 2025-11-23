import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`


  :root {
    --primary: #F27D70;
    --primary-hover: #E06C5F;
    --background: #FFF5F2;
    --text: #4A2525;
    --text-light: #7A5C5C;
    --white: #FFFFFF;
    --font-main: 'Inter', sans-serif;
    --font-title: 'Lexend', sans-serif;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: var(--font-main);
    background-color: var(--background);
    color: var(--text);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }
`;
