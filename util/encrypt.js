const Cryptr = require('cryptr');
const secretKey = "ANY STRING";
const encrypt = new Cryptr(secretKey);

exports.encrypt_password = encrypt_password;


async function encrypt_password(text){
   return encrypt.encrypt(text);
}
