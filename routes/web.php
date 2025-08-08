<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\AppointmentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    // Product
    Route::get('/Products',[ProductsController::class, 'index'])->name('Products.index');
    Route::post('/Products',[ProductsController::class, 'Store'])->name('Products.Store');
    Route::get('/Products/Create',[ProductsController::class, 'Create'])->name('Products.Create');
    // Post
    Route::get('/Post',[PostController::class, 'index'])->name('Post.index');
    Route::get('/Post/Create',[PostController::class, 'Create'])->name('Post.Create');
    // Appointment
    Route::get('/Appointment',[AppointmentController::class, 'index'])->name('Appointment.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
