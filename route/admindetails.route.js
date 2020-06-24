const express = require('express');
const router = express.Router();
const userService = require('../service/admindetails.service');

//router.post('/student', );
router.post('/', insertAdmin);
router.get('/:id', getStudentById);
router.put('/:id', updateAdmin);
router.delete('/:id', deleteStudent);

// put = update
    // need auth (to follow)
    // update all data, same on save request body
    // modified by (temporary NULL);
    // modified by date NOW();

// delete = delete
    // need auth (to follow)
    // modified by (temporary NULL);
    // modified by date NOW();

// get = get user info
    // need auth (to follow)
    // return all fields

// const Cryptr = require('cryptr');
// const secretKey = "ANY STRING";
// const encrypt = new Cryptr(secretKey);
// // encrypt password
// user_details.password_encrypted = encrypt.encrypt(user_details.pwd);

async function insertAdmin(req, res, next){

    const { body } = req;
    const result = await userService.insertAdmin(body);
    res.send(result);
    
}

async function updateAdmin(req, res, next){
    const { body } = req;
    const { params } = req;
    const { id } = params;
    const result = await userService.updateAdmin(id, body);
    res.send(result);

}

async function getStudentById(req, res, next){
    const { params } = req;
    const { id } = params;
    const result = await userService.getStudentById(id);
    res.send(result);
}

async function deleteStudent(req, res, next){
    const { params } = req;
    const { id } = params;
    const result = await userService.deleteStudent(id);
    res.send(result);
}



module.exports = router;
