angular
    .module('myApp', [
        'ngAnimate',
        'ui.router',
    //    'ui.bootstrap',
        'templates',
        'ngFileUpload',
        'Devise'
    ])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
            $stateProvider
                .state('layout',{
                    url: '',
                    templateUrl: '../assets/layout.html',
                    abstract:true,
                    controller: 'LayoutCtrl'
                })
                .state('register',{
                    urm: '/register',
                    templateUrl: '../assets/registration.html',
                    parent: 'layout',
                    controller: 'AuthCtrl',
                    /*onEnter: ['$state', 'Auth', function($state, Auth) {
                        Auth.currentUser().then(function (){
                        $state.go('home');
                        });
                    }]*/
                })
                .state('home', {
                    url: '/',
                    templateUrl: '../assets/home.html',
                    parent: 'layout',
                    controller: 'HomeCtrl'
                })
                .state('about', {
                    url: '/about',
                    templateUrl: '../assets/about-us.html',
                    parent: 'layout',
                    controller: 'memberCtrl',
                    resolve: {
                        memberPromise : ['members',function(members){
                            return members.getAll();
                        }]    
                    }
                })
                .state('services', {
                    url: '/services',
                    templateUrl: '../assets/services.html',
                    parent: 'layout',
                    controller:'serviceCtrl',
                    resolve: {
                        servicePromise :['services',function(services){
                            return services.getAll();
                        }]
                    }
                })
                .state('portofolio', {
                    url: '/portofolio',
                    templateUrl: '../assets/portofolio.html',
                    parent: 'layout',
                    controller:'portofolioCtrl',
                    resolve: {
                        portofolioPromise : ['portofolios',function(portofolios){
                            return portofolios.getAll();
                        }]
                    }
                })
                .state('blog', {
                    url: '/blog',
                    templateUrl: '../assets/blog.html',
                    parent: 'layout',
                    controller: 'blogCtrl',
                    resolve: {
                        postPromise: ['posts', function(posts){
                            return posts.getAll();
                        }]
                        }
                })
                .state('contact', {
                    url: '/contact',
                    parent: 'layout',
                    templateUrl: '../assets/contact-us.html',
                })
                .state('faq', {
                    url: '/faq',
                    parent: 'layout',
                    templateUrl: '../assets/faq.html',
                })
                .state('terms', {
                    url: '/terms',
                    parent: 'layout',
                    templateUrl: '../assets/terms.html',
                })
                .state('career', {
                    url: '/career',
                    parent: 'layout',
                    templateUrl: '../assets/career.html',
                })
                .state('blogItem', {
                    url: '/blogItem/{idpost}',
                    templateUrl: '../assets/blog-item.html',
                    parent:'layout',
                    controller: 'blogItemCtrl',
                    resolve : {
                        idpost : ['$stateParams',function($stateParams){
                            return $stateParams.idpost;
                        }]
                    },
                });
                
                
            // default fall back route
            $urlRouterProvider.otherwise('/');
        
            // enable HTML5 Mode for SEO
            // $locationProvider.html5Mode(true);
    });