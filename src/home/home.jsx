import React, {useState, useEffect} from 'react';
import './home.css';
import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

export function Home({ userName, authState, onAuthChange }) {
  const [index, setIndex] = useState(0);
  const images = [
    {
      url: `merlin's dragon.jpg`,
      alt: "Merlin's Dragon",
      description: "Brief description of Merlin's Dragon"
    },
    {
      url: `gregor the overlander.jpg`,
      alt: "Gregor the Overlander",
      description: "Brief description of Gregor the Overlander"
    },
    {
      url: `the-way-of-kings-by-brandon-sanderson.png`,
      alt: "The Way of Kings",
      description: "Brief description of The Way of Kings"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section>
      <main>
        <h1 className="p-4">Home Page</h1>
        {/* Slideshow */}
        <div className='slideshow-container'>
          {images.map((image, i) => (
            <div
              key={i}
              className={`slide ${i === index ? 'active' : ''}`}
              style={{ display: i === index ? 'block' : 'none' }}
            >
              <img src={image.url} alt={image.alt} className="slideshow-image" />
            </div>
          ))}
          <p style={{ fontSize: '1.5rem' }} className="d-flex justify-content-center p-4">
            {images[index].description}
          </p>
        </div>

        <hr />

        {/* Login */}
        <div>
          {authState !== AuthState.Unknown && <h5>Sign up for monthly updates!</h5>}
          {authState === AuthState.Authenticated && (
            <Authenticated
              userName={userName}
              onLogout={() => {
                onAuthChange('', AuthState.Unauthenticated);
              }}
            />
          )}
          {authState === AuthState.Unauthenticated && (
            <Unauthenticated
              userName={''}
              onLogin={(loginUserName) => {
                onAuthChange(loginUserName, AuthState.Authenticated);
              }}
            />
          )}
        </div>
      </main>
    </section>
  );
}
