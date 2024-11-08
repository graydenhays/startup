import React from 'react';
import './about.css';

export function About() {
  const [authorPic] = React.useState("Author Pic.png");
  const [emailLink] = React.useState("index.html");

  return (
    <main>
      <h1 className="p-4">Meet the Author</h1>

      <div><img className="picture p-4" src={authorPic} alt="Author Profile Picture" width="250px" height="200px"/></div>

      <div className="p-4" style="font-size: x-large; text-align: center;">
        <p>
          Info about the Author
        </p>
        <div className="p-4"></div>
        <div className="quote p-5">
          <div>Here is a quote from the author.</div>
          <div>- Me</div>
        </div>
      </div>
      <div style="font-size: x-large;">
        Email me here: <a href={emailLink}>email</a>
      </div>
    </main>
  );
}
