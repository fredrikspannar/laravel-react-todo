<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/

use App\Http\Controllers\Api\TodoController;
use App\Http\Controllers\Api\TodoItemController;

Route::resource('todo', TodoController::class, ['only' => [ 'index', 'store', 'destroy', 'update', 'show' ]]);
Route::resource('todo-item', TodoItemController::class, ['only' => [ 'store', 'destroy', 'update' ]]);