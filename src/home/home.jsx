import React, {useState, useEffect} from 'react';
import './home.css';
import { Button, Card, Form, FormControl } from 'react-bootstrap';
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

  // const [image1Url] = React.useState(`merlin's dragon.jpg`);
  // const [image2Url] = React.useState(`gregor the overlander.jpg`);
  // const [image3Url] = React.useState(`the-way-of-kings-by-brandon-sanderson.png`);
  // const [bookDesc] = React.useState('Brief description of current book on slide');
  const [commentURL] = React.useState("../about/about.jsx");
  function navigate(url) {
    console.log("Navigate to other page")
  }
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

        {/* Comments */}
        <div className="d-flex flex-column p-4">
          <h3 className="d-flex justify-content-center">Reviews</h3>
          <Card className="p-2">
            <Card.Body>Comment #1</Card.Body>
          </Card>
          <Card className="p-2">
            <Card.Body>Comment #2</Card.Body>
          </Card>
          <Card className="p-2">
            <Card.Body>Comment #3</Card.Body>
          </Card>
          <div className='d-flex'>
            <FormControl type="text" placeholder="Add comment here..." />
            <Button variant='primary' onClick={() => navigate({ commentURL })}>
              {'Add Comment'}
            </Button>
          </div>
        </div>

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
