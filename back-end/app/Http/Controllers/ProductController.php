<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ProductRequest;
use App\Http\Requests;
use App\Product;
use App\Category;
use App\Http\Resources\Product as ProductResource;

class ProductController extends Controller
{
    public function indexAll(){
        $products = Product::orderBy('created_at', 'DESC')->get();
        return ProductResource::collection($products);
    }
    
    public function index($category_id){
        $category = Category::findOrFail($category_id);
        $products = Product::where('category_id', $category->id)->paginate(20);
        return ProductResource::collection($products);
    }

    public function showProduct($id, $category_id)
    { 
        $product = Product::findOrFail($id);
        return new ProductResource($product, $category_id);
    }

    public function storeProduct(ProductRequest $request){

        $product = new Product();
        $product->title = $request->input('title');
        $product->original_price = $request->input('original_price');
        $product->lower_price = $request->input('lower_price');
        $product->description = $request->input('description');
        $product->category_id = $request->input('category_id');

        if(!$request->hasFile('image')) {
            return response()->json(['uploaded_file_not_found'], 400);
        }
        $file = $request->file('image');
        if(!$file->isValid()) {
            return response()->json(['invalid_file_upload'], 400);
        } else {
            $file = $request ->file('image');
                $path = public_path('/uploads/products/');
                $path2 = asset('/uploads/products/');
                $file->move($path, $file->getClientOriginalName());
                $product->image = $path2 . '/' . $file->getClientOriginalName();
        }
        $product->save();

        $response=[
            'product' => $product
        ];

        return response()->json($response, 201);
    }

    public function updateProduct(Request $request, $id, $category_id) {

        $product = Product::findOrFail($id);

        $request->validate([
            'title' => 'min:3|max:50',
            'original_price' => 'regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
            'lower_price' => 'regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
            'description' => 'min:15',
        ]);

        if (!$id){
            return response()->json(['message' => 'Product not found'], 404);
        }   
        if ($request->hasfile('image')){ 
            $file = $request ->file('image');
                $path = public_path('/uploads/products/');
                $path2 = asset('/uploads/products/');
                $file->move($path, $file->getClientOriginalName());
                $product->image = $path2 . '/' . $file->getClientOriginalName();
        } else if($request->hasfile('image') == false){
            $product->image = $request->image;
        } else {
            return $request;
            $product->image = '';
        }
        $product->title = $request->title;
        $product->original_price = $request->original_price;
        $product->lower_price = $request->lower_price;
        $product_description = $request->description;

        if($product->save()) {
            return new ProductResource($product, $category_id);
        }
    }

    public function destroyProduct(Product $product, $category_id) {
        $product->delete();
        $products = Product::all();
        return response()->json(['message => "Product Deleted'], 200);
    }

}
