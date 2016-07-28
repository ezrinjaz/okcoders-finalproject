angular.module('contactsApp').controller('contactEditCtrl', function($scope, $uibModal, $uibModalInstance, $http, contactItem){
            console.log('contactEditCtrl contactItem= ', contactItem);
            function getContacts(){
                $http.get('/contacts').then(function(response){
                    console.log('getContacts Async ' + response.data);
                    $scope.contacts = response.data;
                });
            };
           $scope.contact = contactItem;

            $scope.save = function(){
                console.log('saveContact ' + $scope.contact._id)
                $http.post('/contacts', $scope.contact).then(function(response){   
                    console.log('saveContact /contacts: ', response.data);
                    getContacts();
                    $uibModalInstance.close();
                });
            };

            $scope.cancel = function(){
                $uibModalInstance.dismiss();
            };
        });