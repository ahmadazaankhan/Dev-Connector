import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';

import { Provider } from 'react-redux';

// const App = () => (
//   <Router>
//     <Fragment>
//       <Navbar />
//       <Routes>
//         <Route exact path="/" element={<Landing />} />
//         <section className='container'>
//             <Route exact path='/register' element={<Register />} />
//             <Route exact path='/login' element={<Login />} />
//         </section>
//       </Routes>
//     </Fragment>
//   </Router>
// );

const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <section className='container'>
        <Routes>
          <Route exact path='/' element={<Landing />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
        </Routes>
      </section>
    </Fragment>
  </Router>
);

export default App;