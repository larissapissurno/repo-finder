import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Routes from './routes';
import GlobalStyle from './styles/global';

toast.configure({
  autoClose: 2000,
});

function App() {
  return (
    <>
      <Routes />
      <GlobalStyle />
    </>
  );
}

export default App;
