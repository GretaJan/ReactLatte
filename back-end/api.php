<?php

use Illuminate\Http\Request;

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


Route::get('/products', 'ProductController@indexProduct');
Route::put('/product/{id}/{category_id}', 'ProductController@updateProduct');
Route::get('/product/{id}/{category_id}', 'ProductController@showProduct');
Route::post('/addProduct', 'ProductController@storeProduct');
Route::delete('/product/{product}/{category_id}', 'ProductController@destroyProduct');

Route::get('/categories', 'CategoryController@indexCategories');
Route::post('/addCategory', 'CategoryController@storeCategory');
Route::get('/category/{id}', 'CategoryController@showCategory');
Route::put('/category/{id}', 'CategoryController@updateCategory');
Route::delete('category/{category}', 'CategoryController@destroyCategory');


// Passport
Route::post('/login', 'UserController@login');
Route::post('/register', 'UserController@register');

Route::group([
  'middleware' => 'auth:api'
], function() {
    Route::get('/logout', 'UserController@logout');
    Route::get('/user', 'UserController@user');
});
