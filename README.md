## Introduction
Simple WebApp which let to search and watch You Tube videos.

The app was deployed on [https://you-tube-player-redux-100.herokuapp.com/](https://you-tube-player-redux-100.herokuapp.com/)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Implementation details
Main used dependencies
- [Create React App](https://create-react-app.dev/)
- [Redux](https://github.com/reduxjs/redux)
- [TypeScript](https://www.typescriptlang.org/)
- [cross-fetch](https://github.com/lquixada/cross-fetch)
- [localForage](https://github.com/localForage/localForage)
- [Bootstrap](https://getbootstrap.com/)
- [reactstrap](https://reactstrap.github.io/)
- [styled-components](https://www.styled-components.com/)
- [Connected React Router](https://github.com/kswin/connected-react-router/)

During the implemented was used node v10.16.3.

## Runing the app
### Runing as NodeJS service
1. Install dependencies and build the app for production to the build folder using `npm install`.
2. Copy `example.env` as `.env` and update `REACT_APP_YT_KEY` variable value with your You Tube API Key, e.g.
```
REACT_APP_YT_KEY=yourYouTubeAPIKey
```
4. Run app using `npm start`.
5. App will be available on [http://localhost:8080](http://localhost:8080)(If port wasn't changed by `.env`).

### Runing the app in the development mode
1. Install dependencies and build the app for production to the build folder using `npm install`.
2. Copy `example.env` as `.env` and update `REACT_APP_YT_KEY` variable value with your You Tube API Key, e.g.
```
REACT_APP_YT_KEY=yourYouTubeAPIKey
```
4. Run app using `npm run serve`.
5. App will be compiled and opened in default browser on http://localhost:3000.
The page will reload if you make edits.
You will also see any lint errors in the console.

## Unit tests
#### Unit tests:
1. Sync and thunk action creators - src/actions/index.spec.tsx
2. Reducer - src/reducers/query.spec.tsx
3. Jest Snapshots - src/components/Navigation.spec.tsx
4. Check calls of component event handler - src/components/Navigation.spec.tsx
5. Container with mocked store and RouteComponentProps - src/containers/App.spec.tsx

100% unit tests coverage wasn't the target of this project.

#### Runing unit tests:
1. Install dependencies and build using `npm install`.
2. Run unit tests by `npm test`.
3. To check test coverage run `npm test -- --coverage --watchAll`.
