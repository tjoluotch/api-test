module.exports = (app) => {

    const accounts = require('../controllers/account.controller.js');

    // Create a new User Account
    app.post('/accounts', accounts.create);

    // Retrieve all Accounts created
    app.get('/accounts', accounts.findAll);
}