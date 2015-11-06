var app = angular.module('BankApp', ['ngRoute']);

    app.config(function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/carousel.html',
            controller: "carouselCtrl"
        });
        $routeProvider.when('/backend', {
            templateUrl: 'views/registro.html',
            controller: "mainCtrl"
        });
        $routeProvider.when('/home', {
            templateUrl: 'views/home.html',
            controller: "mainCtrl"
        });
        $routeProvider.when('/productos', {
            templateUrl: 'views/productos.html',
            controller: "mainCtrl"
        });
    });

    function mainCtrl ($scope, $http, $location){
     	$scope.newUser = {};
		$scope.users = {};
		$scope.selected = false;
		

        $http.get("/api/user").success(function(data){
        	$scope.users = data;
        }).error(function(data) {
			console.log('Error: ' + data);
		});

		// Función para registrar a una persona
		$scope.registrarPersona = function() {
			$http.post('/api/user', $scope.newUser)
			.success(function(data) {
					$scope.newUser = {}; // Borramos los datos del formulario
					$scope.users = data;
				})
			.error(function(data) {
				console.log('Error: ' + data);
			});
		};

		// Función para editar los datos de una persona
		$scope.modificarPersona = function(newUser) {
			console.log("atento"+ newUser);
			$http.put('/api/user/'+ newUser._id, newUser)
			.success(function(data) {
					$scope.newUser = {}; // Borramos los datos del formulario
					$scope.users = data;
					$scope.selected = false; 

				})
			.error(function(data) {
				console.log('Error: ' + data);
			});
		};

		// Función que borra un objeto persona conocido su id
		$scope.borrarPersona = function(newUser) {
			$http.delete('/api/user/' + $scope.newUser._id)
			.success(function(data) {
				$scope.newUser = {};
				$scope.users = data;
				$scope.selected = false;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
		};

		// Función para coger el objeto seleccionado en la tabla
		$scope.selectPerson = function(user) {
			$scope.newUser = user;
			$scope.selected = true;
			console.log($scope.newUser, $scope.selected);
		};

		// Función para limpiar el formulario
		$scope.clearForm = function(user) {
			$scope.newUser = user;
			$scope.selected = false;
			//resetea el forumlario
			$scope.newUser = angular.copy($scope.master);
		};

		$scope.login = function(newUser){
			$http.post('auth/login', $scope.newUser)
			.success(function(data){
				$location.url("/home");
				$scope.nombre= data;
				console.log("esto es la data "+ data);

			}).error(function(data){
				console.log('Error: '+ data);
				$location.url("/home");
				$scope.nombre = "error en la : " + data;
			});
		};

		$scope.sign = function(newUser) {
			$http.post('/auth/signup', $scope.newUser)
			.success(function(data){
				$location.url("/home");
				$scope.nombre = data.mensaje;
			}).error(function(data){
				console.log('Error: '+ data);
			});
		};

    }
 	
 	function carouselCtrl($scope){
	  $scope.w = window.innerWidth;
	  $scope.h = window.innerHeight-20;
	  $scope.uri = "http://lorempixel.com";
	  $scope.folders = [
	    'abstract',
	    'animals',
	    'business',
	    'cats',
	    'city',
	    'food',
	    'night',
	    'life',
	    'fashion',
	    'people',
	    'nature',
	    'sports',
	    'technics',
	    'transport'
	  ];
	  $scope.images = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

	  $scope.currentFolder = $scope.folders[0];
	  $scope.selectFolder = function (folder) {
	    $scope.currentFolder = folder;
	  };
	  $scope.activeFolder = function (folder) {
	    return (folder === $scope.currentFolder) ? 'active' : '';
	  };
}

	



