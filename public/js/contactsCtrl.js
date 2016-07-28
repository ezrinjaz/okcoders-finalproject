angular.module('contactsApp').controller('contactsCtrl', function($scope, $http, $uibModal) {
            function getContacts(){
                $http.get('/contacts').then(function(response){
                    console.log('getContacts Async ' + response.data);
                    $scope.contacts = response.data;
                });
                // $scope.filteredTools = [],

            };
            getContacts();

            $scope.categories = ['First Name', 'Last Name', 'Location'];
            
            $scope.loadContact = function(contact){
                console.log('loadContact ' + contact._id);
                var modalInstance = $uibModal.open({
                    templateUrl: 'modals/contactInfo.html',
                    controller: 'contactInfoCtrl',
                    resolve: {
                        contactItem: function(){return angular.copy(contact);}
                    }
                });
                modalInstance.result.then(function(){
                    getContacts();
                });
            };

            $scope.newContact = function(){
                console.log('newContact');
                var contact = {};
                var modalInstance = $uibModal.open({
                    templateUrl: 'modals/editContact.html',
                    controller: 'contactEditCtrl',
                    resolve: {
                        contactItem: function(){return angular.copy(contact);}
                    }
                });
                modalInstance.result.then(function(){
                    getContacts();
                });
            };

            $scope.setSort = function(prop) {
                console.log('Prop=' + $scope.sortProp + ' direction=' + $scope.sortReverse);
                if($scope.sortProp===prop) {        
                    $scope.sortReverse = !$scope.sortReverse;
                    console.log('sortReverse=' + $scope.sortReverse)
                    return;
                }
                $scope.sortProp = prop;
                $scope.sortReverse = false;  
            };
            $scope.sortIcon = function(prop) {              
                if($scope.sortProp!==prop) return null;    
                if($scope.sortReverse===false) return 'glyphicon glyphicon-arrow-down';  
                if($scope.sortReverse===true)  return 'glyphicon glyphicon-arrow-up';   
            };
        });
