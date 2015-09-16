angular
    .module('myApp', [
        'ngAnimate',
        'ui.router',
    //    'ui.bootstrap',
        'templates'
    ])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: '../assets/home.html',
                    controller: 'HomeCtrl'
                })
                .state('about', {
                    url: '/about',
                    templateUrl: '../assets/about-us.html',
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
                })
                .state('blog', {
                    url: '/blog',
                    templateUrl: '../assets/blog.html',
                    controller: 'blogCtrl',
                    resolve: {
                        postPromise: ['posts', function(posts){
                            return posts.getAll();
                        }]
                        }
                })
                .state('contact', {
                    url: '/contact',
                    templateUrl: '../assets/contact-us.html',
                })
                .state('faq', {
                    url: '/faq',
                    templateUrl: '../assets/faq.html',
                })
                .state('terms', {
                    url: '/terms',
                    templateUrl: '../assets/terms.html',
                })
                .state('career', {
                    url: '/career',
                    templateUrl: '../assets/career.html',
                })
                .state('blogItem', {
                    url: '/post',
                    params:{
                        post: null,
                    },
                    templateUrl: '../assets/blog-item.html',
                    controller: 'blogItemCtrl'
                });
                
                
            // default fall back route
            $urlRouterProvider.otherwise('/');
        
            // enable HTML5 Mode for SEO
            // $locationProvider.html5Mode(true);
    });