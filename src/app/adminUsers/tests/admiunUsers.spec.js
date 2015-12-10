describe('Component: AdminUsers', function() {
    var scope,
        q,
        adminUser;
    beforeEach(module('orderCloud'));
    beforeEach(module('orderCloud.sdk'));
    beforeEach(inject(function($q, $rootScope) {
        q = $q;
        scope = $rootScope.$new();
        adminUser = {
            "Username": "TestAdminUser",
            "ID": "TestAdminUser123456789",
            "Email": "testadmin@four51.com",
            "Password": "Fails345",
            "FirstName": "Test",
            "LastName": "Test"
        }
    }));

    describe('Controller: AdminUserCreateCtrl', function() {
        var adminUserCreateCtrl;
        beforeEach(inject(function($state, $controller, AdminUsers) {
            adminUserCreateCtrl = $controller('AdminUserCreateCtrl', {
                $scope: scope,
                AdminUsers: AdminUsers
            });
            spyOn($state, 'go').and.returnValue(true);
        }));

        describe('Submit', function() {
            beforeEach(inject(function(AdminUsers) {
                adminUserCreateCtrl.adminUser = adminUser;
                var defer = q.defer();
                defer.resolve(adminUser);
                spyOn(AdminUsers, 'Create').and.returnValue(defer.promise);
                adminUserCreateCtrl.Submit();
                scope.$digest();
            }));
            it ('should call the AdminUsers Create method', inject(function(AdminUsers) {
                expect(AdminUsers.Create).toHaveBeenCalledWith(adminUser);
            }));
            it ('should enter the adminUsers state', inject(function($state) {
                expect($state.go).toHaveBeenCalledWith('base.adminUsers');
            }));
        });
    });

    describe('Controller: AdminUserEditCtrl', function() {
        var adminUserEditCtrl;
        beforeEach(inject(function($state, $controller, AdminUsers) {
            adminUserEditCtrl = $controller('AdminUserEditCtrl', {
                $scope: scope,
                AdminUsers: AdminUsers,
                SelectedAdminUser: adminUser
            });
            spyOn($state, 'go').and.returnValue(true);
        }));

        describe('Submit', function() {
            beforeEach(inject(function(AdminUsers) {
                adminUserEditCtrl.adminUser = adminUser;
                adminUserEditCtrl.adminUserID = "TestAdminUser123456789";
                var defer = q.defer();
                defer.resolve(adminUser);
                spyOn(AdminUsers, 'Update').and.returnValue(defer.promise);
                adminUserEditCtrl.Submit();
                scope.$digest();
            }));
            it ('should call the AdminUsers Update method', inject(function(AdminUsers) {
                expect(AdminUsers.Update).toHaveBeenCalledWith(adminUserEditCtrl.adminUserID, adminUser);
            }));
            it ('should enter the adminUsers state', inject(function($state) {
                expect($state.go).toHaveBeenCalledWith('base.adminUsers');
            }));
        });

        describe('Delete', function() {
            beforeEach(inject(function(AdminUsers) {
                var defer = q.defer();
                defer.resolve(adminUser);
                spyOn(AdminUsers, 'Delete').and.returnValue(defer.promise);
                adminUserEditCtrl.Delete();
                scope.$digest();
            }));
            it ('should call the AdminUsers Delete method', inject(function(AdminUsers) {
                expect(AdminUsers.Delete).toHaveBeenCalledWith(adminUser.ID);
            }));
            it ('should enter the adminUsers state', inject(function($state) {
                expect($state.go).toHaveBeenCalledWith('base.adminUsers');
            }));
        });
    });
});