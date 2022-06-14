# laravel-react-todo

A Laravel API with an React frontend whith persistant storage in MySQL.

React frontend sources in: /resources/js

Backend API sources in: /app/Http/Controllers/Api

## Install

```
    composer install
    npm install
```

Setup an .env-file with database-config etc: [Laravel Docs - Configuration](https://laravel.com/docs/9.x/configuration)

## Database seeding
Seed some example todo's with items

```
    php artisan db:seed --class=TodoTableSeeder
```

## API routes

```
Method 		URI			
GET 		api/todo 		Get a list of all todo's
POST 		api/todo 		Create a new todo-list ( Required fields: title )
PUT|PATCH 	api/todo/[ID] 		Update a todo-list ( Required fields: title )
DELETE 		api/todo/[ID] 		Delete a todo-list

GET 		api/todo/[ID] 		Show a single todo with items on list

POST 		api/todo-item 		Create a new item on a todo-list ( Required fields: title, todo_id )
PUT|PATCH 	api/todo-item/[ID] 	Update a item on a todo-list ( Required fields: title - Optional: completed )
DELETE 		api/todo-item/[ID] 	Delete a item on a todo-list
```

Note: If testing API with Postman - for PUT/PATCH make sure to send fields encoded as "x-www-form-urlencoded"

For some routes an id-number is required and should be replaced in the URI instead of the placeholder [ID]

## React frontend
Local development - to compile React frontend with watch:

```
    npm run watch
```

Production:

```
    npm run production
```