//Not used in ES6-module-based app

/*
requirejs.config({
    // By default, load any module IDs from js/lib
    baseUrl: 'js/lib',

    // But if the module ID starts with "app", load it from the js/app directory
    // Note: The paths config is relative to the baseUrl and never includes a
    // ".js" extension because the paths config could be for a directory.
    paths: {
        // The path 'jquery' will resolve to the jquery library located at lib/jquery.min.js
        jquery: 'jquery.min',
        app: '../app'
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['app/main']);

// and the 'jquery-private' module, in the
// jquery-private.js file:
define(['jquery'], function (jq) {
    return jq.noConflict( true );
});
*/
