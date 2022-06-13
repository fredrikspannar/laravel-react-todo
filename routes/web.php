<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Mapp all frontend paths to the react-view which has React Router
Route::get('/{path?}', function () {
    return view('react_frontend');
} )->where('path', '^((?!api).)*$'); // except 'api' word
