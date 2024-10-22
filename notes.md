# Notes
## HTTPS
- secure hypertext transport protocol
- encrypted using tls protocol
## HTML
- block element --> 'a distinct block in the flow of the content structure'
- inline element --> 'meant to be inline with the content flow of a block element' -> they don't disrupt the flow of a block element's content
- relative path --> 'references a file that is served fro mthe same location as the HTML page rendering the element'
## Javascript
### DOM: Document Object Model
- "an object representation of the HTML elements that the browser uses to render the display. The browser also exposes the DOM to external code so that you can write programs that dynamically manipulate the HTML." --> accessed through the keyword 'document'
  - "The DOM supports the ability to insert, modify, or delete the elements in the DOM. To create a new element you first create the element on the DOM document. You then insert the new element into the DOM tree by appending it to an existing element in the tree."
  - "The DOM also allows you to inject entire blocks of HTML into an element... However, directly injecting HTML as a block of text is a common attack vector for hackers. If an untrusted party can inject JavaScript anywhere in your application then that JavaScript can represent itself as the current user of the application. The attacker can then make requests for sensitive data, monitor activity, and steal credentials."
### Promises
- Long running blocks of code should be done with Promises
- allows the main rendering thread to continue while some action is executed in the background
- asynchronous: the promis constructor may return before the promise executor runs
- promise states
    - pending
    - fulfilled
    - rejected
- 'then' is called if the promise is fulfilled
- 'catch' is called if the promise is rejected
- 'finally' is always called after all the processing is completed
Example:
````
const coinToss = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.1) {
      resolve(Math.random() > 0.5 ? 'heads' : 'tails');
    } else {
      reject('fell off table');
    }
  }, 10000);
});
coinToss
  .then((result) => console.log(`Coin toss result: ${result}`))
  .catch((err) => console.log(`Error: ${err}`))
  .finally(() => console.log('Toss completed'));
````
- Using await
    - "The ***async*** keyword declares that a function returns a promise. The ***await** keyword wraps a call to the async function, blocks execution until the promise has resolved, and then returns the result of the promise."
````
try {
  const result = await coinToss();
  console.log(`Toss result ${result}`);
} catch (err) {
  console.error(`Error: ${err}`);
} finally {
  console.log(`Toss completed`);
}
````

