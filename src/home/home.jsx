import React from 'react';
import './home.css';

export function Home(props) {
  const [image1Url, setImage1Url] = React.useState('image1');
  const [image2Url, setImage2Url] = React.useState('image2');
  const [image3Url, setImage3Url] = React.useState('image3');
  const [bookDesc, setDesc] = React.useState('Loading...');
  const [quoteAuthor, setQuoteAuthor] = React.useState('unknown');

  // We only want this to render the first time the component is created and so we provide an empty dependency list.
  React.useEffect(() => {
    setImage1Url(`merlin's dragon.jpg`);
    setImage2Url(`gregor the overlander.jpg`);
    setImage3Url(`the-way-of-kings-by-brandon-sanderson.png`);
    setDesc('Brief description of current book on slide');
    setQuoteAuthor('Linus Torvalds');
  }, []);

  return (
    <body>
      <header>
        <div class="d-flex flex-row p-2">
          <img class="me-2" src="user icon.jpg" alt="User Icon" width="30px" height="30px" />
          <p>Hello *profile name here*!!</p>
        </div>
        <h1 style="display: flex; justify-content: flex-end; padding-right: 1rem;">Author Website</h1>
        {/* Navigation */}
        <nav>
          <menu>
            <a class="navStyles" href="index.html">Home</a>
            <a class="navStyles" href="about.html">About</a>
            <a class="navStyles" href="info.html">Info</a>
          </menu>
        </nav>
        <hr />
      </header>

      <main>
        <h1 class="p-4">Home Page</h1>
        {/* Slideshow */}
        <div>
          <div>
            <img class="slideshow" src={image1Url} alt="Merlin's Dragon" />
            <img class="slideshow" src={image2Url} alt="Code of the Claw" />
            <img class="slideshow" src={image3Url} alt="Way of Kings" />
          </div>
          <p style="font-size: 1.5rem;" class="d-flex justify-content-center p-4">{bookDesc}</p>
        </div>

        <hr />

        {/* Comments */}
        <div class="d-flex flex-column p-4">
          <h3 class="d-flex justify-content-center">Reviews</h3>
          <div>
            <p class="p-2">Comment #1</p>
            <p class="p-2">Comment #2</p>
            <p class="p-2">Comment #3</p>
          </div>
          <div>
            <input type="text" placeholder="Add comment here..." />
            <button type="submit">Add Comment</button>
          </div>
        </div>

        {/* Sign up */}
        <div class="p-5 d-flex flex-column">
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
            <div class="p-2" style="display: flex; justify-content: end !important;">
              <button type="submit">Login</button>
              <button type="submit">Create</button>
            </div>
          </form>
        </div>
      </main>

      <footer class="d-flex flex-column mb-3">
        <hr />
        <span style="font-size: large;" class="p-2">Grayden Hays</span>
        <a style="font-size: large;" class="p-2" href="https://github.com/graydenhays/startup">GitHub</a>
      </footer>
    </body>
  );
}
