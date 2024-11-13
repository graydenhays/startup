import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { Info } from './info/info';
import { Home } from './home/home';
import { About } from './about/about';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function App() {
  const [profileName, setName] = React.useState("**enter profile name here**");
  const [userIcon] = React.useState("../public/user_icon.jpg");
  const updateName = (name) => {
    setName(name)
  }
  return (
    <BrowserRouter>
      <div className='body text-light'>
        <header className='container-fluid'>
          <nav className='navbar fixed-top bg-dark navbar-dark'>
            <div className='d-flex'>
              <div className='navbar-brand'>
                Author Page<sup>&reg;</sup>
              </div>
              <menu className='navbar-nav'>
                <li className='nav-item'>
                  <NavLink className='nav-link' to=''>
                    Home
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink className='nav-link' to='info'>
                    Info
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink className='nav-link' to='about'>
                    About
                  </NavLink>
                </li>
              </menu>
            </div>
            <div className="d-flex flex-row p-2">
              <Image className="me-2" src={userIcon} alt="User Icon" width="30px" height="30px" />
              <p>Hello {profileName}!</p>
            </div>
          </nav>
        </header>


        <Routes>
          <Route path='/' element={<Home nameUpdate={updateName}/>} /> {/* The Home component is the problem */}
          <Route path='/info' element={<Info />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;
