//const { insertStudent } = require("../service/userdetails.service");

const mysqlConnection = require("../mysql.connection");


exports.insertStudent = insertStudent;
exports.getStudent = getStudent;
exports.getStudentById = getStudentById;
exports.updateStudentById = updateStudentById;
exports.deleteStudentById = deleteStudentById;


const STUDENT_ROLE = 2;
async function insertStudent(student, connection){
    
    try {
        const table = 'user_details';
        const params = [];
        const sql = `
            INSERT INTO ${table} (first_name, middle_name, last_name, email, gender, password, birthdate, user_role_id)
            VALUES ( ?, ?, ?, ?, ?, ?, ?, ?);    
    
        `; 
    
        params.push(student.firstname);
        params.push(student.middlename);
        params.push(student.lastname);
        params.push(student.email);
        params.push(student.gender);
        params.push(student.password);
        params.push(student.birthdate);
        params.push(STUDENT_ROLE);

    
        const savedStudent = await connection.queryAsync(sql, params);
        return await connection.queryAsync(`UPDATE ${table} set created_by_id = ? WHERE id = ?`, [savedStudent.insertId, savedStudent.insertId]);
    } catch (err) {
        console.log('SQL QUERY ERROR:', err)
    }
}

async function getStudent(connection){
    //const query = mysqli_query(connection, `SELECT * FROM 'user_details' where email = "christiandavid@gmail.com"`);
    
    try {
        const table = 'user_details';
        const sql = `
            SELECT COUNT(*)
            AS emailCount 
            FROM ${table} where email = "dsadfadsf@gmail.com"

        `; 

        const checkEmail = await connection.queryAsync(sql, [])
        
        if(checkEmail[0].emailCount > 0){
            console.log('Already existed');
        }else{
            console.log('Not existed');
        }

        //return await connection.queryAsync( `SELECT * FROM 'user_details' where email = "christiandavid@gmail.com"`)

    } catch (err) {
        console.log('SQL QUERY ERROR:', err)
    }
} 

async function getStudentById(id, connection){
    try {
        const table = 'user_details';
        const params = [];
        const sql = `
            SELECT
            *
            FROM ${table}
            WHERE id = ?;
    
        `; 

        params.push(id);

        return await connection.queryAsync(sql, params)
    } catch (err) {
        console.log('SQL QUERY ERROR:', err)
    }
} 

async function updateStudentById(id, student, connection){
    try {
        const table = 'user_details';
        const params = [];
        const sql = `
            UPDATE ${table} SET 
            first_name = ?,
            middle_name = ?,
            last_name = ?,
            email = ?,
            gender = ?,
            password = ?,
            birthdate = ?,
            modified_date = NOW()
            
            WHERE id = ?;
        `; 

        params.push(student.firstname);
        params.push(student.middlename);
        params.push(student.lastname);
        params.push(student.email);
        params.push(student.gender);
        params.push(student.password);
        params.push(student.birthdate);
        
        params.push(id);

        return await connection.queryAsync(sql, params)
    } catch (err) {
        console.log('SQL QUERY ERROR:', err)
    }
} 

async function deleteStudentById(id, connection){
    try {
        const table = 'user_details';
        const params = [];
        const sql = `
            UPDATE ${table} SET modified_date = NOW(), is_active = "0"
            WHERE id = ?;
    
        `; 

        params.push(id);

        return await connection.queryAsync(sql, params)
    } catch (err) {
        console.log('SQL QUERY ERROR:', err)
    }
} 