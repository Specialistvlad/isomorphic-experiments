// This is startpoint of Isomorph application
// Server Side Rendering(SSR) with Single Page Application(SPA)

// Prevent requiring files with these extensions
const ignoreExtensions = ['.css', '.less', '.scss', '.sass', '.ttf', '.woff', '.woff2'];
ignoreExtensions.forEach((ext) => require.extensions[ext] = () => {});

require('babel-core/register');
require('babel-polyfill');
require('./server');
