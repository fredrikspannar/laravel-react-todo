# laravel-react-todo

A Laravel API with an React frontend whith persistant storage in MySQL.

## Database seeding
Seed some example todo's with items

```
    php artisan db:seed --class=TodoTableSeeder
```

## API routes

```
Method		URI			
GET			api/todo 			Get a list of all todo's

GET			api/todo/[ID] 		Show a todo with items on list with ID in [ID]
```