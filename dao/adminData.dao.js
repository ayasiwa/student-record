//const { deleteStudent } = require("../service/admindetails.service");

exports.insertAdmin = insertAdmin;
exports.updateAdmin = updateAdmin;
exports.getStudentById = getStudentById;
exports.deleteStudent = deleteStudent;

const STUDENT_ROLE = 1;
async function insertAdmin(student, connection){
    // try {
    //     const table = 'user_details';
    //     const params = [];
    //     const sql = `
    //         INSERT INTO ${table} (first_name, middle_name, last_name, email, gender, password, birthdate , user_role_id, created_date, is_active, created_by_id)
    //         VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, NOW(), "1", ?);    
    
    //     `; 
    
    //     params.push(studentInfo.firstname);
    //     params.push(studentInfo.middlename);
    //     params.push(studentInfo.lastname);
    //     params.push(studentInfo.email);
    //     params.push(studentInfo.gender);
    //     params.push(studentInfo.password);
    //     params.push(studentInfo.birthdate);
    //     params.push(studentInfo.userrole);
    //     params.push(id)

    
    //     return await connection.queryAsync(sql, params)
    // } catch (err) {
    //     console.log('SQL QUERY ERROR:', err)
    // }

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

async function updateAdmin (id, admin, connection){

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
        
        params.push(admin.firstname);
        params.push(admin.middlename);
        params.push(admin.lastname);
        params.push(admin.email);
        params.push(admin.gender);
        params.push(admin.password);
        params.push(admin.birthdate);
        params.push(id);
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

async function deleteStudent(id, connection){
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