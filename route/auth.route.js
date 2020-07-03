const express = require('express');
const router = express.Router();
const authService = require('../service/auth.service');
const response_util = require('../util/response_util');
const user = require('../middleware/decode.auth.middleware');


router.post('/', login);
router.put('/',admin); 
// router.post('/:id', user.is('adminOnly'), admin);

async function login(req, res, next){
    const { body } = req; 
    return authService
        .isLoggedIn(body)
        .then(result => response_util.processResponse(null, result, res, req))
        .catch(err => response_util.failPromise(err, 500, res, req, next));

    
}

async function admin(req, res, next){
    console.log('Hey');
    
}


module.exports = router;

