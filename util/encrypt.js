const Cryptr = require('cryptr');
const secretKey = "ANY STRING";
const encrypt = new Cryptr(secretKey);

exports.encrypt_password = encrypt_password;
exports.decrypt_password = decrypt_password;


async function encrypt_password(text){
   return encrypt.encrypt(text);
}

async function decrypt_password(text){
   return encrypt.decrypt(text);
}