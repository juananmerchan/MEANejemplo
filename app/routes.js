var User = require('./modelo/user');
var Controller = require ('./controller');



module.exports = function(app) {

	app.get('/', function(req, res) {
		res.sendfile('angular/index.html'); // Carga única de la vista
	});
	// devolver todos los Personas
	app.get('/api/user', Controller.getPersona);
	// Crear una nueva Persona
	app.post('/api/user', Controller.setPersona);
	// Modificar los datos de una Petrsona
	app.put('/api/user/:user_id', Controller.updatePersona);
	// Borrar una Persona
	app.delete('/api/user/:user_id', Controller.removePersona);
	// application

	app.post('/auth/signup', Controller.emailSignup);  
    app.post('/auth/login', Controller.emailLogin);
};



