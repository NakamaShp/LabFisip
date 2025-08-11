<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductsController extends Controller
{
    public function index()
    {
        $Products = Product::all();
        return Inertia::render('Products/index', compact('Products'));
    }

    public function create()
    {
        return Inertia::render('Products/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
        ]);
        
        Product::create($request->all());

        return redirect()
            ->route('Products.index')
            ->with('message', 'Produk berhasil dibuat!');
    }

    public function edit(Product $product)
    {
        return Inertia::render('Products/Edit', compact('product'));
    }


    public function update(request $request, Product $product){
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
        ]);

        $product->update ([
            'name' => $request->input('name'),
            'price' => $request->input('price'),
            'description' => $request->input('description'),
        ]);

        return redirect()->route('Products.inded')-> with ('message', 'Product Updated Succesfully ');
    }
    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()
            ->route('Products.index')
            ->with('message', 'Produk berhasil dihapus!');
    }
}
