import React  from 'react';
import './App.scss';

import {Content} from 'carbon-components-react';

import AppHeader from './components/AppHeader';
import { Route,Routes } from 'react-router-dom';
import LandingPage from './content/LandingPage';
import AboutPage from './content/AboutPage';
import Iocr from './content/Iocr';
import ShippingForms from './content/ShippingForms';

function App() {
  return (
    <>

      <AppHeader />
      <Content>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/about' element={<ShippingForms/>} />
        <Route path='/iocr' element={<Iocr/>} />
      </Routes>
      </Content>

    </>
  );
}

export default App;
