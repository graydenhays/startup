import React from 'react';
import Footer from '../Footer'
import Header from '../Header'
import './home.css';

export function Home(props) {
  const [image1Url] = React.useState(`merlin's dragon.jpg`);
  const [image2Url] = React.useState(`gregor the overlander.jpg`);
  const [image3Url] = React.useState(`the-way-of-kings-by-brandon-sanderson.png`);
  const [bookDesc] = React.useState('Brief description of current book on slide');

  return (
    <section>
      <Header />

      <main>
        <h1 class="p-4">Home Page</h1>
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
          <div>
            <p className="p-2">Comment #1</p>
            <p className="p-2">Comment #2</p>
            <p className="p-2">Comment #3</p>
          </div>
          <div>
            <input type="text" placeholder="Add comment here..." />
            <button type="submit">Add Comment</button>
          </div>
        </div>

        {/* Sign up */}
        <div className="p-5 d-flex flex-column">
          <h5>Sign up for monthly updates!</h5>
          <form method="get" action="info.html">
            <div class="p-2">
              <span>@</span>
              <input type="text" placeholder="your@email.com" />
            </div>
            <div>
              <span>🔒</span>
              <input type="password" placeholder="password" />
            </div>
            <div className="p-2" style={{ display: 'flex', justifyContent: 'end' }}>
              <button type="submit">Login</button>
              <button type="submit">Create</button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </section>
  );
}
