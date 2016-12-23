var storage = require('node-persist');
var argv = require('yargs')
    .command('create', 'Creates new account', function(yargs) {
        yargs.options({
          name: {
              demand: true,
              alias: 'n',
              description: 'Account name',
              type: 'string'
          },
            username: {
                demand: true,
                alias: 'u',
                description: 'User name',
                type: 'string'
            },
            password: {
                demand: true,
                alias: 'p',
                description: 'User password',
                type: 'string'
            }
        }).help('help');
    })
    .command('get', 'Get account', function(yargs) {
        yargs.options({
            name: {
                demand: true,
                alias: 'n',
                description: 'Account name',
                type: 'string'
            }
        }).help('help');
    })
    .help('help')
    .argv;
var command = argv._[0];

storage.initSync({
    expiredInterval: false
});
//storage.clearSync();

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

if(command === 'create') {
    createAccount({
        name: argv.name,
        username: argv.username,
        password: argv.password
    });
}
if(command === 'get') {
    console.log('Account', getAccount(argv.name));
}

