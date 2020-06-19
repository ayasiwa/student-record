const mysql = require('../mysql.connection');
const studentData = require('../dao/studentData.dao');
const encrypt = require('../util/encrypt');

exports.insertStudent = insertStudent;
exports.getStudent = getStudent;
exports.getStudentById = getStudentById;

async function insertStudent({student, admin}){
    const connection = await mysql.getTransactionalConnection();
    try{
        // check if email exist
            // if not, let save, else throw error "Email already exist!"
            
        student.password = await encrypt.encrypt_password(student.password);
        const userStudent = await studentData.insertStudent(student, connection);
       // const adminId = await studentData.insertStudent(admin, connection);

        return mysql.commit(connection, 'Successfully saved!')

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
     

        /*const result = {
            info: {
                //firstname: userInfoRes[0].firstname
                ...userInfoRes[0]
            },
            birthdate: {
                ...userBirthdateRes[0]
            }
        };
*/
        return mysql.commit(connection, studentInfo)

    } catch (err) {

        return mysql.rollback(connection, err); 
    }
}