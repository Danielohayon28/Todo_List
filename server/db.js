const Pool =require("pg").Pool;

const pool = new Pool({
    name:"post",
   user:"danielohayon",
    password:"",
    host:"localhost",
    port: 5432, 
    database:"pentodo"
});

module.exports = pool;