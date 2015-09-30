# b-on-rails

I'm *still* building this app for a students NGO. It's meant to be pretty basic, with blog-like features. The user can manage member, posts, and services.
It is made to combine both AngularJS and Rails. The reliable tutorails I found on the net are:
* [JCole Morrison's tutorial](http://start.jcolemorrison.com/angularjs-rails-4-1-and-ui-router-tutorial/)
* [Thinkster's tutorial](https://thinkster.io/angular-rails/)

Find here the working board : [Trello] (https://trello.com/b/yEB6ZDxF/ruby-project)
To get access to it : [sign in](https://trello.com/) then prompt me to add you.

# Ruby on Rails 

This application requires : 
* Ruby version 2.0.0
* Rails version 4.2.4

# AngularJS

This application uses [AngularJS](https://angularjs.org/)

Angular Modules required :
* ngAnimate
* ui.bootstrap
* ui-router > manages the routings 
* templates
* ngFileUpload
* Devise

ui.bootstrap is disabled for compatibility reasons.

# Database

This application uses MySQL with ActiveRecord

# Documentation 

This doc should explain everything, from how to install the app to how to use it.
Still under construction.

# Overall architecture

The app wires AngularJS and Rails. Rails manages the server-side and angular the client-side. Therefore, Rails does not generate the templates itself.
The main views are :
* Home or > Accueil
* About-us or > L'association
* Services > or > Notre action 
* Blog 
* Contact

Please refer to app.js to set/get the different states. The path is : app/assets/javascripts/app.js
The editable **templates** are located at : app/assets/templates
If ever the design i.e .css files and scss files has to be upgraded, refer to css folder : app/assets/javascripts/ng-app/css
The **ngControllers** can be found at : app/assets/javascripts/ng-app/controllers

In few words, the app.js sets the front-end configuration. Each controller is associated to a service that provides that data needed in a given page.
For example, in app/assets/javascripts/ng-app/controllers/blog.js there is : the posts services that provides blog posts to the BlogCtrl, which in return 
manages the blog-item.html.erb found in app/assets/templates/. 

