const mysql = require('../mysql.connection');
const jwt = require('jsonwebtoken');
const httpErrors = require('http-errors');
const encrypt = require('../util/encrypt');
const userDao = require('../dao/user.dao');
const secretKey = "ANY STRING";

exports.isLoggedIn = isLoggedIn;
exports.decodeAuthToken = decodeAuthToken;


async function isLoggedIn({email, password}){
    const connection = await mysql.getTransactionalConnection();

    try {
        const dbtable = 'user_details';
        const params2 = [];
            const sqlQuery = `
                SELECT COUNT(*)
                AS emailCount 
                FROM ${dbtable} where email = ?

            `; 
        
        params2.push(email);
        const checkEmail = await connection.queryOneAsync(sqlQuery, params2)
        
        if(checkEmail.emailCount > 0){
            const userDetails = await userDao.getUserDetailByEmail(email, connection);
        
            const { password : current_password } = userDetails;
           
            console.log(encrypt.decrypt_password(current_password));
            
            
            // check if current passowrd = password
            console.log(encrypt.decrypt_password(current_password));
            if(password == await encrypt.decrypt_password(current_password)){
                // generate token
                delete userDetails.password;
    
                const tokenDetails = {
                    ...userDetails
                }
                return jwt.sign(tokenDetails, secretKey, {expiresIn: 86400});
            } else {
                throw new httpErrors(400, 'Wrong Username/Password')
            }
        }else{
            throw new httpErrors(400, 'Email doesn\'t exist.'); 
        }
        
       


    } catch (err) {
        return mysql.rollback(connection, err); 
    }
}


async function decodeAuthToken(auth){
    if(auth){
        const decoded = jwt.verify(auth, secretKey);
        console.log('decoded', decoded);
        return decoded;
    }
    
   return;
}
