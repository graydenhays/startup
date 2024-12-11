import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { Info } from './info/info';
import { Home } from './home/home';
import { About } from './about/about';
import { AuthState } from './home/authState';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);
  const [userIcon] = React.useState("../public/user_icon.jpg");
  const dbUrl = "mongodb+srv://cs260:cs260dbpassword@cluster0.dk5to.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
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
              {userName ? <p>Hello {userName}!</p> : <p>Please sign in.</p>}
            </div>
          </nav>
        </header>


        <Routes>
          <Route
            path='/'
            element={
              <Home
                userName={userName}
                authState={authState}
                onAuthChange={(userName, authState) => {
                  setAuthState(authState);
                  setUserName(userName);
                }}
              />
            }
          />
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
