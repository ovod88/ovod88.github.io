var storage = require('node-persist');
storage.initSync({
    expiredInterval: false
});
storage.clearSync();


function createAccount(account) {
    var accounts = storage.getItemSync('accounts');

    if(!accounts) {
        accounts = [];
        accounts.push(account);
    } else {
        for(var i in accounts) {
            if(accounts[i].username !== account.username) {
                accounts.push(account);
                break;
            }
        }
    }

    storage.setItemSync('accounts', accounts);
}

function getAccount(accountName) {
    var accounts = storage.getItemSync('accounts');
    var matchedAccount;
    if(accounts) {

        accounts.forEach(function(account) {
            if(account.name === accountName) {
                matchedAccount = account;
            }
        })
    }
    return matchedAccount;
}

//var facebookAccount = {
//    name: 'Facebook',
//    username: 'User12',
//    password: '123456'
//};
//
//var twitterAccount = {
//    name: 'Twitter',
//    username: 'User321',
//    password: '654321'
//};
//
//createAccount(facebookAccount);
//createAccount(twitterAccount);
//console.log('Twitter account ', getAccount('Twitter'));