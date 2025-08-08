<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductsController extends Controller
{
    public function index(){
        return Inertia::render('Products/index',[]);
    }

    public function Create(){
        return Inertia::render('Products/Create');
    }
    public function Store(Request $request){
        $request -> validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
        ]);
        Product::Create($request->all());
        return redirect()-> route('Products.index');

    }

    

}
