var express=require("express");
var app=express();
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
var mysql=require("mysql");


var con = mysql.createConnection({
  host: "localhost",
  user: "flamingo",
  password: "flamingos",
  database: "db_transport"
});


//  var sql = "ALTER TABLE comentarii ADD CONSTRAINT FK_TRANSPORT_COMENTARIU FOREIGN KEY (transportId) REFERENCES transporturi(id)";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table altered");});
  

app.set('view engine','ejs');
//  var transporturi=[{numar:300,statie_pornire:"Clabucet",statie_oprire:"Piata Romana",comentariu:"Este cald"},
//     {numar:102,statie_pornire:"Bd Basarabia",statie_oprire:"Gara Progresul",comentariu:"Foarte aglomerat"},
//     {numar:335,statie_pornire:"Complex Comercial Baneasa",statie_oprire:"Faur",comentariu:"A ocolit"}
//     ]
app.get("/",function(req,res){
    res.render('landing');
})

app.get("/transport",function(req,res){
  
  con.query("SELECT * FROM transporturi", function (err, result, fields) {
    if (err) throw err;
    else
    res.render("transport",{transporturi:result});
   
});
    
    
});

app.get("/transport/nou",function(req,res){
    res.render("nou.ejs");
});

app.get("/transport/:id",function(req,res)
{
    
var sql = 'SELECT * FROM transporturi WHERE id = ?';
con.query(sql, req.params.id, function (err, result) {
  if (err) throw err;
  else
   res.render("dupaId",{trans:result});
});
});

app.post("/transport/:id",function(req,res){
     var sql = 'SELECT * FROM transporturi WHERE id = ?';
con.query(sql, req.params.id, function (err, result) {
  if (err) throw err;
  else
    res.render("dupaId",{trans:result});
    var comentariu=req.body.comentariu;
    var comentariuNou={autor:"anonim",comentariu:comentariu,transportId:req.params.id}
    con.query("INSERT INTO comentarii SET ?",comentariuNou,function (error, results, fields) {
	  if (error) throw error;
  });
  res.redirect("dupaId",{trans:result});
    
});
});

app.post("/transport",function(req,res){
   
    var numar=req.body.numar;
    var statie_pornire=req.body.statie_pornire;
    var statie_oprire=req.body.statie_oprire;
    var comentariu=req.body.comentariu;
    var transportNou={numar:numar,statie_pornire:statie_pornire,statie_oprire:statie_oprire,comentariu:comentariu}
 
  console.log("Connected!");
  con.query("INSERT INTO transporturi SET ?", transportNou,function (error, results, fields) {
	  if (error) throw error;
  });
    res.redirect("/transport");
});

app.listen(3000);