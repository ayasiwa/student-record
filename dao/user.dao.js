//const { deleteStudent } = require("../service/admindetails.service");

exports.getUserDetailByEmail = getUserDetailByEmail;


async function getUserDetailByEmail(email, connection){
    try {
        const table = 'user_details';
        const sql = `
            
            SELECT * FROM ${table} WHERE email = ?

        `; 
        
        return await connection.queryOneAsync(sql, [email])
    } catch (err) {
        console.log('SQL QUERY ERROR:', err)
    }

    
}