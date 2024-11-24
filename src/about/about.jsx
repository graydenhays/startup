import React from 'react';
import './about.css';

export function About() {
  const [authorPic] = React.useState("Author Pic.png");
  const [emailLink] = React.useState("index.html");

  return (
    <section>
      <h1 className="p-4">Meet the Author</h1>

      <div><img className="picture p-4" src={authorPic} alt="Author Profile Picture" width="250px" height="200px"/></div>

      <div className="p-4" style={{ fontSize: 'x-large', textAlign: 'center' }}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam viverra, libero non sollicitudin bibendum, dui ligula ullamcorper nulla, ut volutpat ex nulla ut mauris. Fusce venenatis et nisl quis rutrum. Duis finibus dignissim ex, quis mattis nisl ultrices eu. In et mollis est, et condimentum dolor. Integer faucibus accumsan ipsum, et mattis urna egestas id. Phasellus sed ullamcorper orci. Sed venenatis risus quis nunc aliquam vehicula. Curabitur a aliquet arcu. Nullam nec tempor turpis. Cras ut euismod quam. Nullam a nulla quis sem pulvinar lobortis in in mi.
        </p>
        <div className="p-4"></div>
        <div className="quote p-5">
          <div>
            Phasellus malesuada ligula magna, vitae hendrerit eros feugiat pulvinar. Nunc laoreet nibh eu felis interdum porttitor. Etiam ut ex ac eros faucibus venenatis sed vitae nisi. Vestibulum vitae rhoncus leo. Sed risus nisl, volutpat at turpis quis, facilisis lobortis magna. Nunc non lacinia tellus. Nam pretium nulla erat, in consectetur massa imperdiet id. Integer ac viverra nulla, non feugiat odio. Curabitur vel dui sed leo mollis vehicula a at sapien. Aliquam rutrum arcu id velit tincidunt, ultrices interdum mauris dignissim. Vivamus bibendum dignissim ipsum nec pretium. Suspendisse potenti.
          </div>
          <div>
            - Me
          </div>
        </div>
      </div>
      <div style={{ fontSize: 'x-large' }}>
        Email me here: <a href={emailLink}>email</a>
      </div>
    </section>
  );
}
