<?php

namespace App\Http\Controllers;
use Illuminate\Http\UploadedFile;
use App\Http\Requests;
use App\Http\Requests\CategoryRequest;
use App\Product;
use App\Category;
use Illuminate\Http\Request;
use App\Http\Resources\Category as CategoryResource;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
  
    public function indexCategories(){
        $categories = Category::get();
        // $response = ["categories" => $categories];

        return CategoryResource::collection($categories);
    }

    public function showCategory($id) {
        $category = Category::findOrFail($id);

        return new CategoryResource($category);
    }

    public function storeCategory(CategoryRequest $request){
        $category = new Category();
        $category->name = $request->input('name');
            if(!$request->hasFile('image')) {
                return response()->json(['uploaded_file_not_found'], 400);
            }
            $file = $request->file('image');
            if(!$file->isValid()) {
                return response()->json(['invalid_file_upload'], 400);
            } else {
                $file = $request ->file('image');
                $path = public_path('/uploads/categories/');
                $path2 = asset('/uploads/categories/');
                $file->move($path, $file->getClientOriginalName());
                $category->image = $path2 . '/' . $file->getClientOriginalName();
            }
           
            if($category->save()) {
                return new CategoryResource($category);
            }
    }


   public function updateCategory(Request $request, $id){

        $category = Category::findOrFail($id);

        $request->validate([
            'name' => 'string|min:3|max:50'
        ]);

        $category->name = $request->input('name');

        if ($request->hasfile('image')){
            $file = $request ->file('image');
                $path = public_path('/uploads/categories/');
                $path2 = asset('/uploads/categories/');
                $file->move($path, $file->getClientOriginalName());
                $category->image = $path2 . '/' . $file->getClientOriginalName();
               
        } else if ($request->hasfile('image') == false) {
            $category->image = $request->image;
        } else {
            return $request;
            $category->image = '';
        }

       if($category->save()){
            return new CategoryResource($category);
       }  
    }

   public function destroyCategory(Category $category) {
       $category->delete();

        return new CategoryResource($category);
   }

}
