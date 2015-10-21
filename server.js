var express = require("express");
var app = express();
var mongoose = require("mongoose");
var port = process.env.Port || 8080;

//Configuracion conexion a base de datos
mongoose.connect("mongodb://localhost:27017/MeanExample");

app.configure(function(){
	app.use(express.static(__dirname + "/angular"));
	app.use(express.logger("dev")); //activa el log en modo dev.
	app.use(express.urlencoded());
	app.use(express.json());
	app.use(express.methodOverride());

});

//Cargamos los endpoints
require("./app/routes.js")(app);

//Elegimos el puerto a escuchar

app.listen(port);
console.log("App por el puerto "+ port);