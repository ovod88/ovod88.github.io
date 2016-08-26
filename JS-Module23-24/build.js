({
    baseUrl: "js/app",/*Root directory for relative pathes*/
    appDir: "./",/* This tell what to optimize. Here - the whole project*/
    dir: "./dist",/*This tells to where optimise*/
    mainConfigFile: 'js/main.js',/*Copy configuration for 3rd libraries from RequireJS configuration*/

    modules: [
        { name: "../main" }/*Tells what dependencies to optimise*/
    ],

    fileExclusionRegExp: /^(r|build|(build.single))\.js$/,/*Not optimise these files*/
    optimizeCss: 'standard',/*Standard CSS minification + uglifying*/
    removeCombined: true/*Remove optimised modules from output. Leave only main JS script main.jsS*/
})
