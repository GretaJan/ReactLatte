<?php

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

// Route::get('/', function () {
//     return view('welcome');
// });

/*

Route::get('/products', 'ProductController@indexProduct');
Route::post('/products', 'ProductController@storeProduct');
Route::get('/product/create', 'ProductController@createProduct');
Route::get('/product/edit/{product}', 'ProductController@editProduct');
Route::PUT('/products/{product}', 'ProductController@updateProduct');
Route::get('/products/{product}', 'ProductController@showProduct');
Route::DELETE('/products/{product}', 'ProductController@destroyProduct');
*/
/*
Route::get('/categories', 'CategoryController@indexCategories2');
Route::post('/categories', 'CategoryController@storeCategory2');
Route::get('/category/create', 'CategoryController@createCategory');
Route::get('/categories/edit/{category}', 'CategoryController@editCategory');
Route::PUT('/categories/{category}', 'CategoryController@updateCategory');
Route::DELETE('categories/{category}', 'CategoryController@destroyCategory');

*/
Auth::routes();

Route::get('/home', 'HomeController@index')->name('welcome');
