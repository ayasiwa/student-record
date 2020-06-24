const mysql = require('../mysql.connection');
const studentData = require('../dao/studentData.dao');
const encrypt = require('../util/encrypt');

exports.insertStudent = insertStudent;
exports.getStudent = getStudent;
exports.getStudentById = getStudentById;
exports.updateStudentById = updateStudentById;
exports.deleteStudentById = deleteStudentById;




async function updateStudentById(id, {student}){
    const connection = await mysql.getTransactionalConnection();
    try {
        student.password = await encrypt.encrypt_password(student.password);
        const studentInfo = await studentData.updateStudentById(id, student, connection);
     
        return mysql.commit(connection, 'Successfully Updated!')

    } catch (err) {

        return mysql.rollback(connection, err); 
    }
}

async function insertStudent({student}){
    const connection = await mysql.getTransactionalConnection();

    const dbtable = 'user_details';
    const params2 = [];
        const sqlQuery = `
            SELECT COUNT(*)
            AS emailCount 
            FROM ${dbtable} where email = ?

        `; 
    
    params2.push(student.email);

    const checkEmail = await connection.queryAsync(sqlQuery, params2)
    console.log(checkEmail);

    if(checkEmail[0].emailCount > 0){
        return "Email already exist."
    }else{
        try{
            // check if email exist
                // if not, let save, else throw error "Email already exist!"
                
            student.password = await encrypt.encrypt_password(student.password);
            const userStudent = await studentData.insertStudent(student, connection);
           
            return mysql.commit(connection, 'Successfully saved!')
    
        } catch (err) {
            return mysql.rollback(connection,err);
        }
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