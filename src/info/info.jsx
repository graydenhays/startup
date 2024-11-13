import React, { useState, useEffect } from 'react';
import './info.css';

export function Info() {
  const [unsubscribeLink] = React.useState("../home/home.jsx");
  const [subNumber, setSubNumber] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSubNumber(prevNumber => prevNumber + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section>

      <div className="p-5">Info about subscription</div>

      <div className="p-5">{subNumber} people are already signed up!</div>

      <div className="widget p-5">Interactive widget celebrating your sub</div>

      <div style={{ flexGrow: 1, display: 'flex' }}>
          <div style={{ alignSelf: 'end' }}>Would you like to unsubscribe? Click <a href={unsubscribeLink}>here</a></div>
      </div>

    </section>
  );
}
