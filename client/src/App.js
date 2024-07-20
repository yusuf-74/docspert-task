import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UNPROTECTED_ROUTES } from './routes';
import NavBar from './components/NavBar';


function App() {
  return (

    <div>
      <NavBar color={'dark'} dark={true} full={true} expand={true} container={'fluid'} fixed={'top'} />
      <Routes>
        {UNPROTECTED_ROUTES.map((route, idx) => (
          <Route
            path={route.path}
            element={<div className='main-page'>
              {route.element}
            </div>}
            key={idx}
            exact={true}
          />
        ))}
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
