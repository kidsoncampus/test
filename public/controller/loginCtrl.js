/**
 * Created by LucyQiao on 5/6/16.
 */
app.controller('loginCtrl',function($rootScope,$location,Auth) {

    var vm = this;

    //get info if a persion is logged in
    vm.loggedIn = Auth.isLoggedIn();
    
    // check to see if a user is logged in on every request
    $rootScope.$on('$routeChangeStart', function() {
        vm.loggedIn = Auth.isLoggedIn();

        // get user information on page load
        Auth.getUser()
            .then(function(data) {
                vm.user = data.data;
            });
    });

    //function to handle login form
    vm.doLogin = function () {
        vm.processing=true;

        //clear the error
        vm.error='';

        //call the Auth.login() function
        Auth.login(vm.loginData.email, vm.loginData.password)
            .success(function (data) {
                vm.processing=false;
                //if a user successfully logs in, redirect to users dashboard page
                if(data.success){
                    $location.path('/currentParent');
                }else{
                    vm.error=data.message;
                }
            });
    };

    //function to handle logging out
    vm.doLogout = function () {
        Auth.logout();
        //reset all user info
        vm.user = {};
        $location.path('/login');
    };

});
