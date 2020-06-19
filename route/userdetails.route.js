const express = require('express');
const router = express.Router();
const userService = require('../service/userdetails.service');

router.post('/', insertStudent);
router.get('/', getStudent);
router.get('/:id', getStudentById);

async function insertStudent(req, res, next){

    const { body } = req;

    const result = await userService.insertStudent(body);

    res.send(result);
    
}

async function getStudent(req, res, next){
    const result = await userService.getStudent();
    res.send(result);
}

async function getStudentById(req, res, next){
    const { params } = req;
    const { id } = params;
    const result = await userService.getStudentById(id);
    res.send(result);
 }


module.exports = router;
