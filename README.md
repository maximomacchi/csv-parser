# Maximo Macchi - CSV Parser

## How to Run

Open two terminals, one to run the client app and one to run the server.

### Client App

1. In the root directory, run the command `yarn add`
2. Run `npm start`
3. The app should automatically open in your browser at the address `localhost:3000`

### Server App

1. In the root directory, run the command `npm install`
2. Run `npm start`
3. The server should start running at `localhost:3001`

## Sources Used

[Express generator](http://expressjs.com/en/starter/generator.html) - Used to quickly generate boilerplate code for a simple Express REST API

[express-fileupload](https://www.npmjs.com/package/express-fileupload) - NPM package used to access files in form data for POST requests

[Node.js file system guide](https://www.w3schools.com/nodejs/nodejs_filesystem.asp) - Guide used as reference for writing out server-side code using `fs` module

[Create React App](https://create-react-app.dev/) - Used to quickly generate boilerplate code of React app

[Fetch API example](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) - Guide used as reference for working with `fetch` API in Javascript

## Dev Environment Used to Build App

- Machine: 2016 MacBook Pro 15 inch Touch Bar model
- Browser: Firefox v87.0

## Ideas for Further Development

- Add support for duplicate file uploads (appending duplicate file name with `(1)` or something similar)
- Add options to view data in different form (pie chart, line graph, etc.)
