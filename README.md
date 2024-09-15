# Author Profile Page

### Elevator pitch

Are you ready for a fresh and inspiring fantasy? Are you eager to find a story that doesn't follow predictable plots found all over your local bookstore? This website shows the best rising author and allows you to see her best selling novels and sign up for exclusive updates of future progress. 

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

[Link to notes](https://github.com/graydenhays/startup/blob/main/notes.md)
