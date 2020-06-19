const express = require('express');
const router = express.Router();
const userService = require('../service/admindetails.service');

router.post('/:id', insertAdmin);
router.get('/:id', getStudentById);
router.put('/:id', updateAdmin);
router.delete('/:id', deleteStudent);

async function insertAdmin(req, res, next){

    const { body } = req;
    const { params } = req;
    const { id } = params;
    const result = await userService.insertAdmin(id,body);
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
    const { body } = req;
    const { params } = req;
    const { id } = params;
    const result = await userService.deleteStudent(id, body);
    res.send(result);
}



module.exports = router;
