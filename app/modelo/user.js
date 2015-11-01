var mongoose = require('mongoose');
    //Schema   = mongoose.Schema;

module.exports = mongoose.model('User', {
	usuario:  { type: String },
  	password: { type: String },
  	datosPersonales:{
  	 nombre:   { type: String },
  	 apellidos: { type: String },
  	 direccion: {type: String }
  	},
  	cuentaCorriente:{
  	 codigo:{ type: String },
  	 saldo: { type: Number },
  	 tarjeta: {type: Boolean }
  	}
});
/*
var userSchema = new Schema({  
  usuario:  { type: String },
  password: { type: String },
  datosPersonales:{
  	 nombre:   { type: String },
  	 apellidos: { type: String },
  	 direccion: {type: String }
  	},
  cuentaCorriente:{
  	 codigo:{ type: String },
  	 saldo: { type: Number },
  	 tarjeta: {type: Boolean }
  	}
 
});

module.exports = mongoose.model('user', userSchema);  
*/
/*
 
    cuentaCorriente :{
		activa: Boolean,
		numeroCuenta: String,
		saldo: Number,
		ingresos :{
				concepto: String,
				cantidad: Number,
				origen: String
		},
		gastos :{
			concepto: String,
			cantidad: Number,
			Origen: String
			
		}
	},
	tarjeta : {
		activa: Boolean,
		numeroTarjeta: String,
		gastos :{
			Concepto: String,
			cantidad: Number,
			Origen: String
			}
	}



});
*/
//module.exports = mongoose.model("User", userSchema, datosPersonales);

