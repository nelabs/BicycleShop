const express = require('express');
const router = express.Router();

const { storeUser, login, loginPage, registerPage } = require('../controller/user');

router.post('/user', storeUser);

router.post('/login', login);

router.get('/login', loginPage);

router.get('/register', registerPage);


module.exports = router;
