const mysql = require('../mysql.connection');
const adminData = require('../dao/adminData.dao');

exports.insertAdmin = insertAdmin;
exports.updateAdmin = updateAdmin;
exports.getStudentById = getStudentById;
exports.deleteStudent = deleteStudent;

async function insertAdmin(id, {student}){
    const connection = await mysql.getTransactionalConnection();
    try{
        const studentInfo = await adminData.insertAdmin(id, student, connection);


        return mysql.commit(connection, 'Successfully saved!')

    } catch (err) {
        return mysql.rollback(connection,err);
    }
}


async function updateAdmin(id, {student}){
    const connection = await mysql.getTransactionalConnection();
    try{
        const userAdmin = await adminData.updateAdmin(id, student, connection);
        
        return mysql.commit(connection, userAdmin)

    } catch (err) {
        return mysql.rollback(connection,err);
    }
}

async function getStudentById(id){
    const connection = await mysql.getTransactionalConnection();
    try {
        
        const studentInfo = await adminData.getStudentById(id, connection);
     
        return mysql.commit(connection, studentInfo)

    } catch (err) {

        return mysql.rollback(connection, err); 
    }
}

async function deleteStudent(id, { student }){
    const connection = await mysql.getTransactionalConnection();
    try {
        
        const studentInfo = await adminData.deleteStudent(id, student, connection);
     
        return mysql.commit(connection, studentInfo)

    } catch (err) {

        return mysql.rollback(connection, err); 
    }
}

