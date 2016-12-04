var clients = [];

exports.subscribe = function(req,resp) {
    clients.push(resp);
    console.log("SUBDCRIBE");

    resp.on('close', function() {
        clients.splice(clients.indexOf(resp), 1);
    })
};

exports.publish = function(message) {
    console.log("PUBLISH");
    clients.forEach(function(resp) {
        resp.end(message);
    });
    clients = [];
};

setInterval(function() {
    console.log(clients.length)
    }, 2000);