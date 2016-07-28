angular.module('contactsApp').controller('contactInfoCtrl', function($scope, $uibModal, $uibModalInstance, $http, contactItem){
            console.log('contactInfoCtrl contactItem= ', contactItem);
            function getContacts(){
                $http.get('/contacts').then(function(response){
                    console.log('getContacts Async ' + response.data);
                    $scope.contacts = response.data;
                });
            };
            $scope.contact = contactItem;

            $scope.cancel = function(){
                console.log('cancel');
                $uibModalInstance.dismiss();
            };

            $scope.delete = function(){
                console.log('deleteContact ' + $scope.contact._id)
                var deleteModalInstance = $uibModal.open({
                    templateUrl: 'modals/confirmDelete.html',
                    controller: function($scope, $uibModalInstance){
                        $scope.yes = function(){
                            $uibModalInstance.close();
                        };
                        $scope.no = function(){ 
                            $uibModalInstance.dismiss();
                        };
                    }
                });

                deleteModalInstance.result.then(function(){
                    $http.delete('/contacts/' + $scope.contact._id).then(function(){   
                        $uibModalInstance.close();
                    });    
                });
            };
            $scope.edit = function(){
                console.log('editContact ' + $scope.contact._id);
                var modalInstance = $uibModal.open({
                    templateUrl: 'modals/editContact.html',
                    controller: 'contactEditCtrl',
                    resolve: {
                        contactItem: function(){return angular.copy($scope.contact);}
                    }
                });
                modalInstance.result.then(function(){
                    getContacts();
                    $uibModalInstance.close();
                });
            };

        });