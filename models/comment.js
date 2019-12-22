var mysql=require("mysql");
var con=mysql.createConnection({
  host: "localhost",
  user: "flamingo",
  password: "flamingos",
  database: "db_transport"
});
  var sql = "CREATE TABLE comentarii (autor VARCHAR(255), text VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
  
  module.exports=con.module("Comentariu");