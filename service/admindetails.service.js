const mysql = require('../mysql.connection');
const adminData = require('../dao/adminData.dao');
const encrypt = require('../util/encrypt');

exports.insertAdmin = insertAdmin;
exports.updateAdmin = updateAdmin;
exports.getStudentById = getStudentById;
exports.deleteStudent = deleteStudent;

async function insertAdmin({ admin }){
    const connection = await mysql.getTransactionalConnection();
    try{
       
        admin.password = await encrypt.encrypt_password(admin.password);
        const userStudent = await adminData.insertAdmin(admin, connection);

        return mysql.commit(connection, 'Successfully saved Admin!')

    } catch (err) {
        return mysql.rollback(connection,err);
    }
}


async function updateAdmin(id, {admin}){
    const connection = await mysql.getTransactionalConnection();
    try{
        admin.password = await encrypt.encrypt_password(admin.password);
        const userAdmin = await adminData.updateAdmin(id, admin, connection);
        
        return mysql.commit(connection, 'Successfully Updated Admin!')

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

async function deleteStudent(id){
    const connection = await mysql.getTransactionalConnection();
    try {
        
        const studentInfo = await adminData.deleteStudent(id, connection);
     
        return mysql.commit(connection, 'Successfully Deleted Admin!')

    } catch (err) {

        return mysql.rollback(connection, err); 
    }
}

