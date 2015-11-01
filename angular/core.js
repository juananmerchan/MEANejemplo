var app = angular.module('BankApp', ['ngRoute']);

    app.config(function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/carousel.html',
            controller: "mainCtrl"
        });
        $routeProvider.when('/datos', {
            templateUrl: 'views/registro.html',
            controller: "mainCtrl"
        });
    });

    function mainCtrl ($scope, $http){
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
			$http.put('/api/user/'+ $scope.newUser._id, $scope.newUser)
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
	

    };

   


		
