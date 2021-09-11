import React from 'react';
import Routes from './routers';
import { view as Header } from './commons/header';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header />
      <Routes />
    </Router>
  );
}

export default App;
