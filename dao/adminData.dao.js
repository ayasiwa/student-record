//const { deleteStudent } = require("../service/admindetails.service");

exports.insertAdmin = insertAdmin;
exports.updateAdmin = updateAdmin;
exports.getStudentById = getStudentById;
exports.deleteStudent = deleteStudent;


async function insertAdmin(id, studentInfo, connection){
    try {
        const table = 'user_details';
        const params = [];
        const sql = `
            INSERT INTO ${table} (first_name, middle_name, last_name, email, gender, password, birthdate , user_role, created_date, is_active, created_by_id)
            VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, NOW(), "1", ?);    
    
        `; 
    
        params.push(studentInfo.firstname);
        params.push(studentInfo.middlename);
        params.push(studentInfo.lastname);
        params.push(studentInfo.email);
        params.push(studentInfo.gender);
        params.push(studentInfo.password);
        params.push(studentInfo.birthdate);
        params.push(studentInfo.userrole);
        params.push(id)

    
        return await connection.queryAsync(sql, params)
    } catch (err) {
        console.log('SQL QUERY ERROR:', err)
    }
}

async function updateAdmin (id, student, connection){

    try {
        const table = 'user_details';
        const params = [];
        const sql = `
            
            UPDATE ${table} SET modified_date = NOW(), modified_by_id = ?
            WHERE id = ?;
        `; 
    
        params.push(id);
        params.push(student.studentId);
        return await connection.queryAsync(sql, params)
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

async function deleteStudent(id, student, connection){
    try {
        const table = 'user_details';
        const params = [];
        const sql = `
            
            UPDATE ${table} SET modified_date = NOW(), modified_by_id = ?, is_active = "0"
            WHERE id = ?;
        `; 

        params.push(id);
        params.push(student.studentId);

        return await connection.queryAsync(sql, params)
    } catch (err) {
        console.log('SQL QUERY ERROR:', err)
    }
}