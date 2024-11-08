import React from 'react';
import './info.css';
import Footer from '../Footer';
import Header from '../Header';

export function Info(props) {
  const [unsubscribeLink] = React.useState("index.html");
  const [subNumber] = React.useState(0);

  return (
    <section>
      <Header />

      <p className="p-5">Info about subscription</p>

      <p className="p-5">{subNumber} people are already signed up!</p>

      <div className="widget p-5">Interactive widget celebrating your sub</div>

      <div style="flex-grow: 1; display: flex;">
          <div style="align-self: end;">Would you like to unsubscribe? Click <a href={unsubscribeLink}>here</a></div>
      </div>

      <Footer />
    </section>
  );
}
