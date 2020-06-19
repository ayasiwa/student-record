//const { insertStudent } = require("../service/userdetails.service");

exports.insertStudent = insertStudent;
exports.getStudent = getStudent;
exports.getStudentById = getStudentById;

const STUDENT_ROLE = 1;
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
    try {
        const table = 'user_details';
        const sql = `
            SELECT
            *
            FROM ${table};
    
        `; 

        return await connection.queryAsync(sql, [])
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
