# Scrum Quiz

This app shows how to build a Scrum Quiz as a Progressive Web App. A working example can be found here [https://scrumquizz.firebaseapp.com](https://scrumquizz.firebaseapp.io). The idea was to build a quizz, which leverages the power of gamification to make learning for a Scrum-Certification like PSM or PSPO a fun activity.

## Main Features:
- Can be saved to homescreen on Android / IOs 11.3+
- Can be opened in full screen
- Can receive Push Notificaitons (in progress)
- Support Offline Data (not yet)
- Support Sensors (not yet)


# To Dos
Open To-Dos and issues:

- [ ] Code: re-establish the structure: functional / "dumb" components in components and state-ful/smart ones in containers  
- [ ] Offline Capability: store highscore in localstorage 
- [ ] Offline Capability: add an upload- queue for new highscores and submit it when online again
- [ ] Firebase Cloud Functions: Refactore firebase functions to use the FCM library instead of REST Api
- [ ] Firebase Cloud Messageing: Check firefox issue
- [ ] Firebase Cloud Messageing: Add local push notifications that are triggered if app not used often
- [ ] Firebase Cloud Messageing: the configuration of the service should be made like with the axios service
- [ ] Firebase Cloud Messageing: the messaging code does only implement the handle method not the other lifecycle methods
- [ ] Firebase Cloud Messageing: the "online" push notifications are not shown correctly, the "background" push notifications neither :)
- [ ] Firebase Authentication: Re-enable
- [ ] Content: Add more quizes
- [ ] Content: Add "Quiz" vs "learning" modes 
- [ ] User Profile: add Avatar and Username for highscore
- [ ] Legal: add Impressum and user licence agreement etc.
- [ ] Favorites: implement the "save to favorites" feature
- [ ] Gamification: add elapsed time to highscore
- [ ] Gamification: add time-based extra bonus for quick answers
- [ ] Code: eliminate Redux Thunk and other, not used, dependencies
- [ ] Code: remove inline styles and put it into css modules
- [ ] Code: write some more tests
- [ ] Gamification: add banners and certificates
- [ ] Gamification: add recommendation for scrum.org exam
- [ ] Build: establish a CI/CD Pipeline with Travis CI, TeamCity etc.


# Docs

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You can find the most recent version of the create react app guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Build
For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

You can delete or rename the other files.

You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack.<br>
You need to **put any JS and CSS files inside `src`**, otherwise Webpack won’t see them.

Only files inside `public` can be used from `public/index.html`.<br>
Read instructions below for using assets from JavaScript and HTML.

You can, however, create more top-level directories.<br>
They will not be included in the production build so you can use them for things like documentation.

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### More about Build and Project Setup
You can find further reading about webpack and the project build in the official guide: [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Features
### Material UI
To have a easy styling, we rely on Material UI. Please refer to the docs here [https://www.material-ui.com/#/](https://www.material-ui.com/#/)


### Async Components
To showcase how not-so-often used components are loaded lazily, the asyncComponent higher order component (HOC) has ben implemented and used in the App.js to wrapp the Auth component. This is only to showcase how to use the asyncComponent HOC - it were better to use it on components that clearly are used not so often.


### Redux and Saga
In order to separate asynchronous from synchronous code, the asynchronous actions are implemented with the "saga" approach. Check out the official docs for related information.

Generally, the components dispatch synchronous Redux Actions (by using the action creators) which in return trigger asynchronous sagas. These, after being completed, then trigger the synchronous reducers in order to update the state. Like this, synchronous code is nicely separated from asynchronous code.

### Firebase Cloud Messaging
In order to send push notificaitons, firebase provides the FCM Service. A draft on how to implement Push Notifications is already in the code - nevertheless it needs heavy refactorings: refer to the ToDos above.

### Firebase Cloud Functions
To not distribute the server key with the client, Firebase Cloud Functions are used.