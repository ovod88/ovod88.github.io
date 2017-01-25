function doWork (shouldFail) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            console.log('done!');
            if(shouldFail) {
                reject('Rejected');
            } else {
                resolve();
            }
        }, 1000);
    })
}

doWork(true).then(function() {
    return doWork(true);
}).then(function () {
    console.log('All is done');
}).catch(function(error) {
    console.log(error);
});