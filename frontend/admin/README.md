# This is a React Isomorphic application.

There are two ways to start app:

## Single page application
1. Build app using webpack `npm run admin-build` from project root, then copy files from `build` folder to `static` folder.
2. Serve folder `static` and go to the your browser. For example your server at http://localhost:8080/ This will load clean, static `index.html` and start simple SPA from `/bundle.js`


## Isomorphic application
1. Build app using webpack `npm run admin-build` from project root
2. Start backend using `npm run backend` from project root.
3. Run server using `npm run admin-isomorphic` or `npm run admin-isomorphic-dev` and go to http://localhost:8081/ This will render page on server side and return complete html page. Even if you disable javascript in your browser you will see complete page. Then browser will load /bundle.js and start simple SPA, then voalá and SPA apps replaced static page, enjoy!
