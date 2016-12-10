
module.exports = function(module) {

    return function () {
        var arg = [module.filename].concat([].slice.call(arguments));
        console.log.apply(console, arg);
    }
};
