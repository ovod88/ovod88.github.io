var storage = require('node-persist');
storage.initSync({
    expiredInterval: false
});


storage.setItemSync('accounts', [{
    username: 'Vova2',
    balance: 75
}]);


var accounts = storage.getItemSync('accounts');

console.log(accounts);
console.log('ENDING');



