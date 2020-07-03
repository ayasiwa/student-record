const mysql = require('../mysql.connection');
const studentData = require('../dao/studentData.dao');
const encrypt = require('../util/encrypt');
const secretKey = "ANY STRING";

exports.insertStudent = insertStudent;
exports.getStudent = getStudent;
exports.getStudentById = getStudentById;
exports.updateStudentById = updateStudentById;
exports.deleteStudentById = deleteStudentById;




async function updateStudentById(id, {student}){
    const connection = await mysql.getTransactionalConnection();
    try {
        // TODO:
        // check if email exist - done
        student.password = await encrypt.encrypt_password(student.password);

        
        const studentInfo = await studentData.updateStudentById(id, student, connection);
     
        return mysql.commit(connection, studentInfo)

    } catch (err) {

        return mysql.rollback(connection, err); 
    }
}

async function insertStudent({student}){

    // TODO:
    // put thins checkinhg of email in dao layer - done
    const connection = await mysql.getTransactionalConnection();

   
    try{
        // check if email exist
            // if not, let save, else throw error "Email already exist!" - done
            
        student.password = await encrypt.encrypt_password(student.password);
        console.log(student.password);
        const userStudent = await studentData.insertStudent(student, connection);
        
        return mysql.commit(connection, userStudent)

    } catch (err) {
        return mysql.rollback(connection,err);
    }


    
}


async function getStudent(){
    const connection = await mysql.getTransactionalConnection();

    try {
        
        const result = await studentData.getStudent(connection);
        

        return mysql.commit(connection, result)

    } catch (err) {
        return mysql.rollback(connection, err);
    }
}



/**
 * 
 * @param {*} id 
 */
async function getStudentById(id){
    const connection = await mysql.getTransactionalConnection();
    try {
        
        const studentInfo = await studentData.getStudentById(id, connection);
     
        return mysql.commit(connection, studentInfo)

    } catch (err) {

        return mysql.rollback(connection, err); 
    }
}

async function deleteStudentById(id){
    const connection = await mysql.getTransactionalConnection();
    try {
        const studentInfo = await studentData.deleteStudentById(id, connection);
     
        return mysql.commit(connection, 'Successfully Deleted!')

    } catch (err) {

        return mysql.rollback(connection, err); 
    }
}