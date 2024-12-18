# Author Profile Page

### Elevator pitch

Are you ready for a fresh and inspiring fantasy? Are you eager to find a story that doesn't follow predictable plots found all over your local bookstore? This website shows the best rising author and allows you to see her best selling novels and sign up for exclusive updates of future progress. You also get to see how excited everyone else is by seeing the number of avid fans and their top comments.

![Home Page](homepg.jpg)
![About Page](aboutpg.jpg)

Here is the sequence diagram that shows how the subscriber tally is updated.
![Sequence Diagram](Sequence_diagram.jpg)

### Key features

- Secure login over HTTPS
- Display of total subscriber tally updated in realtime
- Ability to interact with book and review slideshows
- User information is stored upon subscription
- User information can be removed if unsubscribed
- Ability for admin to update book and review list

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Uses HTML to appropriately format website. 2-3 HTML pages, for the home page, about page, and potentially a sign up page.
- **CSS** - Uses CSS to design the aesthetic and styling of the website. Will be used for a color scheme, sizing, and other features relating to appearance.
- **React/JavaScript** - Uses react for logic relating to user login, submitting information, displaying the subsriber tally, routing and components.
- **Service** - Backend service with endpoints for:
  - login
  - unsubscribing from notification list
  - retrieving total subscriber tally status
- **DB/Login** - Store user profile information in database. Register and login users. Securely stores all sensitive account data in database. Can't unsubrcribe from notifications unless authenticated.
- **WebSocket** - As each user registers, the total subscriber tally increments by one and is updated for all other users

### HTML deliverable

Here are the HTML elements I included for my deliverable.

- [x] **HTML pages** - Three HTML pages that allow users to register, comment, and see more info.
- [x] **Links** - The signup button automatically links to the info page. The nav bar contains links for every page. The unsubscribe button redirects to the main page.
- [x] **Text** - There are textual elements on the about and info pages, as well as user input with the comments section.
- [x] **Images** - I included images on each page and plan on creating a slideshow on the main page.
- [x] **DB/Login** - Input box and submit button for login. Comments and the number of subscribers will also be stored.
- [x] **WebSocket** - There will be a real time updating tally of total subscribers as well as updates for comments from other users.
- [x] **Third Party Service Call** - I included a placeholder for there to be a link which will redirect the user to the default mail feature on their device.

### CSS deliverable

Here are the HTML elements I included for my deliverable.

- [x] **Styling for header, footer, and main content body**
- [x] **Nav elements** - I changed the color, removed underlines, and added a background to the menu bar.
- [x] **Responsive to window resizing** - My app looks great on all window sizes and devices. If the window gets very small, then the header and footer will not be displayed.
- [x] **Application elements** - Separated elements with appropriate whitespace, color changes and horizontal lines.
- [x] **Application text content** - Fonts are all consistent. Some fonts have a different color for contrast.
- [x] **Application images** - Images are sized appropriately

## React deliverable

For this deliverable I fully converted to React and added some Javascript functionality so that the application works for a single user. I maintained placeholders for future features

- [x] **Bundled and transpiled** - finished!
- [x] **Components** - Footer, voting list, vote are all components with mocks for login, WebSocket.
  - [x] **login** - When you press the create button, the username in the top right corner will update.
  - [x] **database** - Displayed the subscriber count. Currently this is hard coded, but it will be replaced with the database data later. There are also input areas for user information.

## Service deliverable

I added backend endpoints that receive a user's information and returns the total number of subscribers.

- [x] **Node.js/Express HTTP service** - done
- [x] **Static middleware for frontend** - done
- [x] **Calls to third party endpoints** - Grabs computer science quotes from a third party api for the about page.
- [x] **Backend service endpoints** - Placeholders for login that stores the current user on the server. Endpoints for subscriber count.
- [x] **Frontend calls service endpoints** - Use the fetch function?
  - [x] **WebSocket** - The subscriber count will eventually be used with WebSocket so that each time someone signs up, the count increments. Currently uses the api to get the value.
  - [x] **application logic** - Updates username after clicking create button.
- [x] **Router** - Routing between home, info, and about components.
- [x] **Hooks** - React uses `UseState` to track changes in the subscriber count, links, and pictures.

## DB/Login deliverable

For this deliverable I increment the subscriber count with the logged in user. This user can choose to unsubscribe or resubscribe. I stored the users and the subscriber count in the database.

- [x] **MongoDB Atlas database created** - done!
- [x] **Stores data in MongoDB** - done!
- [x] **User registration** - Creates a new account in the database.
- [x] **existing user** - Stores the subscribed status under the same user if the user already exists.
- [x] **Use MongoDB to store credentials** - Stores both user and their subscribed status.
- [x] **Restricts functionality** - You cannot login until you have created an account. You cannot navigate to the info page where you can edit the subscriber count until you have been logged in.

## WebSocket deliverable

For this deliverable I used webSocket to update the subscriber count on the frontend in real time.

- [x] **Backend listens for WebSocket connection** - done!
- [x] **Frontend makes WebSocket connection** - done!
- [x] **Data sent over WebSocket connection** - done!
- [ ] **WebSocket data displayed** - I was unable to get the data to properly display.

[Link to notes](https://github.com/graydenhays/startup/blob/main/notes.md)
