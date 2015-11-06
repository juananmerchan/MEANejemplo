var User = require("./modelo/user");



//Obtiene todos los objetos de la persona de la base de datos
exports.getPersona = function(req,res){
	User.find(function(err, user){
		if (err){
			res.send(err);
			console.log("err");
		}else{
			res.json(user);//devuelve todas las personas en JSON
			console.log("usuarios " + user);
		}
	});
}

//Guarda un Objeto Persona en Base de datos
exports.setPersona = function(req,res){
	/*console.log('POST');
    

    var user = new User({
       usuario: req.body.usuario,
	   password: req.body.password,
	   "datosPersonales.nombre":req.body.datosPersonales.nombre,
	   "datosPersonales.apellidos":req.body.datosPersonales.apellidos,
	   "datosPersonales.direccion":req.body.datosPersonales.direccion,
	   "cuentaCorriente.saldo":req.body.cuentaCorriente.saldo,
	   "cuentaCorriente.tarjeta":req.body.cuentaCorriente.tarjeta
    }); 

    user.save(function(err, user) {
        if(err){
			res.send(err);
		}else{
			//Obtiene y devuelve todas las personas tras crear una de ella
			User.find(function(err, user){
				if (err){
					res.send(err);
				}else{
					res.json(user);
				};
			});
		};
    });*/

	//Crear Objeto Persona
	User.create({
		usuario: req.body.usuario,
		password: req.body.password,
		"datosPersonales.nombre":req.body.datosPersonales.nombre,
		"datosPersonales.apellidos":req.body.datosPersonales.apellidos,
		"datosPersonales.direccion":req.body.datosPersonales.direccion,
		"cuentaCorriente.saldo":req.body.cuentaCorriente.saldo,
		"cuentaCorriente.tarjeta":req.body.cuentaCorriente.tarjeta || false
		
	},
	function(err,user){
		if(err){
			res.send(err);
		}else{
			//Obtiene y devuelve todas las personas tras crear una de ella
			User.find(function(err, user){
				if (err){
					res.send(err);
				}else{
					res.json(user);
				};
			});
		};
	});
}

//Modificamos un Objeto persona de la base de datos
exports.updatePersona = function(req,res){
	console.log('PUT');

	User.update({
		_id: req.params.user_id},
		{
		$set:{
		 	usuario: req.body.usuario,
		 	password: req.body.password,
		 	"datosPersonales.nombre":req.body.datosPersonales.nombre,
	   		"datosPersonales.apellidos":req.body.datosPersonales.apellidos,
	   		"datosPersonales.direccion":req.body.datosPersonales.direccion,
	   		"cuentaCorriente.saldo":req.body.cuentaCorriente.saldo,
	   		"cuentaCorriente.tarjeta":req.body.cuentaCorriente.tarjeta
		 	
		}},
		function(err,user){
			if(err){
				res.send(err);
			}else{
				// Obtiene y devuelve todas las personas tras crear una de ellas
				User.find(function(err, user){
					if(err){
						res.send(err);

					}else{
						res.json(user);

					};
				});
			};
		});
}

// Elimino un objeto Persona de la base de Datos
exports.removePersona = function(req, res) {
	User.remove({_id : req.params.user_id}, function(err, user) {
		if (err)
			res.send(err);
			// Obtine y devuelve todas las personas tras borrar una de ellas
			User.find(function(err, user) {
				if (err)
					res.send(err)
				res.json(user);
			});
		});

}

exports.emailSignup = function(req, res) {  
	User.findOne({usuario: req.body.usuario}, function(err, user) {
		if (err){
			res.send(err);
		}else if (!user){
			 User.create({
				usuario: req.body.usuario,
				password: req.body.password
			},
			function(err,user){
				if(err){
					res.send(err);
					res.json({"mensaje": "Ha ocurrido el siguiente error" + err +"intentelo mas tarde"});
				}else{
					res.json({"mensaje": " "+user.usuario+" te has inscrito correctamente logueate para acceder a tu cuenta"});
					//Obtiene y devuelve todas las personas tras crear una de ella
					User.find(function(err, user){
						if (err){
							res.send(err);
							console.log("err");
						}else{
							res.json(user);//devuelve todas las personas en JSON
							console.log("usuarios " + user);
						}
					});
				};
			});

		}else{
			console.log("El usuario ya existe");
			res.json({"mensaje":"EL usuario esta ocupado pruebe con otro"});
		}   
	});
}

exports.emailLogin = function(req, res) {  
    User.findOne({usuario: req.body.usuario}, function(err, user) {
        // Comprobar si hay errores()
        if (err){
        	res.send(err);
        }else if (user){
        	console.log("el usuario existe");
        	if (user.usuario== req.body.usuario && user.password == req.body.password){
        		console.log("Usuario: " + user.usuario + " contraseña : "+user.password);
        		console.log("contraseña y usuario correctos");
        		res.json(user);
        	}else{
        		console.log("La contraseña o el usuario son incorrectos");
        	
        		res.json({"mensaje":"La contraseña o el usuario son incorrectos vuelva a intenrarlo"});
        	}
        	
        }else {
        	console.log("Usuario no existe");
        	res.json({"mensaje":"EL usuario no existe"});
        }

        // Si el usuario existe o no.
        // Y si la contraseña es correcta
        return res
            .status(200);
    });
};