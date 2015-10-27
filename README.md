# b-on-rails

I'm *still* building this app for a students NGO. It's meant to be pretty basic, with blog-like features. 
The user can manage member, posts, and services.
It is made to combine both AngularJS and Rails. 

Find here the working board : [Trello] (https://trello.com/b/yEB6ZDxF/ruby-project)
To get access to it : [sign in](https://trello.com/) then prompt me to add you.

Once you make sure you have rails set up on your system,
run bundle install to install all the gems. The rake bower:install to install the modules required by angular.
Don't forget rake db:create / rake db:migrate for the database management.

For the beginners in Rails or/and Angular, there are two main tutorials I recommend :
* [JCole Morrison's tutorial](http://start.jcolemorrison.com/angularjs-rails-4-1-and-ui-router-tutorial/)
* [Thinkster's tutorial](https://thinkster.io/angular-rails/)

# Ruby on Rails 

This application requires : 
* Ruby version 2.0.0
* Rails version 4.2.4

# AngularJS

This application uses [AngularJS](https://angularjs.org/)

Angular Modules required :
* ngAnimate
* ui.bootstrap
* ui-router > manages the routings on the client-side service 
* templates
* ngFileUpload
* Devise

To make sure that Rails allows angular to handle our client side routing, the following two lines were added in app/assets/javascripts/application.js:
```sh
root 'application#index'
get '*path' => 'application#index'
```
ui.bootstrap is disabled for compatibility reasons. This issue should be resolved before deployment.

# Database

This application uses MySQL with ActiveRecord.
The gem [mysql2](https://github.com/brianmario/mysql2) supplies with the adapter to the database.
The Mysql2 gem is meant to serve the extremely common use-case of connecting, querying and iterating on results. 
Some database libraries out there serve as direct 1:1 mappings of the already complex C APIs available. This one is not.

# Carrierwave

This application uses [carrierwave](https://github.com/carrierwaveuploader/carrierwave) for the uploading feature.
The default storage directory is in /public/uploads/:model/:mountedas/:model.id.
To change the directory, the store_dir method should be overridden in app/assets/uploader

It is used for the picture uploading feature.

Carrierwave uses [minimagick](https://github.com/minimagick/minimagick) to process some images i.e resizing large pictures. ImageMagick is required before!


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

