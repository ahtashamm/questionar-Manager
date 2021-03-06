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



Auth::routes();

Route::get('/', 'HomeController@index')->name('home');
Route::resource("/questionars",'QuestionarsController');
Route::get('question/create/{id}', [
    'as' => 'question.create',
    'uses' => 'QuestionController@create'
]);
Route::resource("/question",'QuestionController',['except' => 'create']);


