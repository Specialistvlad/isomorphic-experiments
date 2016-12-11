# isomorphic-experiments
Make sure you have latest version of node.js (tested with 7.2.1)

1. Install deps `npm i`
2. Run admin-api `npm run backend`

--- SPA mode ---
3. Run webpack-devserver with single page app `npm run admin-dev-server` it will be available at http://localhost:8080

--- Isomorphic mode ---
4. Build frontend to 'static' folder `npm run admin-build` or with watch `npm run admin-dev`
5. Run isomorphic-server `npm run admin-isomorphic` it will be available at http://localhost:8081 or with nodemon `admin-isomorphic-dev`

Hints:
1. Admin api has delay in `backend/apps/admin-api/routes.js:8`, just comment/uncomment it.
2. You can switch mode between server side rendering and isomorphic by setting variable `spa` to `true` in `frontend/admin/config.js:12`


## Start only webpack-devserver(with hot reloading)
`npm start frontend`

## Build with docker
`docker-compose build; docker-compose up;`
and apps will be available at http://localhost:8080

## Redux basics
http://redux.js.org/docs/basics/


## Standard for Flux action objects
https://github.com/acdlite/flux-standard-action


## Debug frontend
Please use https://github.com/zalmoxisus/redux-devtools-extension for debugging
