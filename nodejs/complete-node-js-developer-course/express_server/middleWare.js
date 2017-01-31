module.exports = {
    requireAuthentication: function(req, resp, next) {
        console.log('private route hit');
        next();
    },
    logger: function (req, resp, next) {
        console.log('Request: ' + new Date().toString() + req.method + ' ' + req.originalUrl);
        next();
    }
};
