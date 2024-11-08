import React from 'react';
import Footer from '../Footer'
import Header from '../Header'
import './home.css';
import { Container, Row, Col, Button, Card, Form, FormControl } from 'react-bootstrap';

export function Home(props) {
  const [image1Url] = React.useState(`merlin's dragon.jpg`);
  const [image2Url] = React.useState(`gregor the overlander.jpg`);
  const [image3Url] = React.useState(`the-way-of-kings-by-brandon-sanderson.png`);
  const [bookDesc] = React.useState('Brief description of current book on slide');
  const [commentURL] = React.useState("index.jsx");
  const [loginURL] = React.useState("index.jsx");
  const [createURL] = React.useState("index.jsx");

  return (
    <section>
      {/* <Header /> */}

      <main>
        <h1 className="p-4">Home Page</h1>
        {/* Slideshow */}
        <div>
          <div>
            <img className="slideshow" src={image1Url} alt="Merlin's Dragon" />
            <img className="slideshow" src={image2Url} alt="Code of the Claw" />
            <img className="slideshow" src={image3Url} alt="Way of Kings" />
          </div>
          <p style={{ fontSize: '1.5rem' }} className="d-flex justify-content-center p-4">
            {bookDesc}
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

        {/* Sign up */}
        <div className="p-5 d-flex flex-column">
          <h5>Sign up for monthly updates!</h5>
          <Form method="get" action="info.html">
            <Form.Group className="p-2">
              <Form.Label>@</Form.Label>
              <FormControl type="text" placeholder="your@email.com" />
            </Form.Group>
            <Form.Group>
              <Form.Label>🔒</Form.Label>
              <FormControl type="password" placeholder="password" />
            </Form.Group>

            <div className="p-2" style={{ display: 'flex', justifyContent: 'end' }}>
              <Button variant='primary' onClick={() => navigate({ loginURL })}>
                {'Login'}
              </Button>
              <Button variant='primary' onClick={() => navigate({ createURL })}>
                {'Create'}
              </Button>
            </div>
          </Form>
        </div>
      </main>

      {/* <Footer /> */}
    </section>
  );
}
