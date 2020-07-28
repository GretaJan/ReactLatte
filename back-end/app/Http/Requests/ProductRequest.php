<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|min:3|max:50',
            'original_price' => 'required|regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
            'lower_price' => 'required|regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
            'description' => 'required|min:15',
            'category_id' => 'required',
            'image' => 'required'
        ];
    }
    // public function rules()
    // {
    //     return [
    //         'title' => 'required|max:50',
    //         'original_price' => 'required|regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
    //         'lower_price' => 'required|regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
    //         'description' => 'required|min:15',
    //         'category_id' => 'required',
    //         'image' => 'required|image'
    //         'title' => 'required',
    //         'original_price' => 'required',
    //         'lower_price' => 'required',
    //         'description' => 'required',
    //         'category_id' => 'required',
    //         'image' => 'required'
    //     ];
    // }
    // public function messages()
    // {
    //     return [
    //         'title.required' => 'Title is required!',
    //         'original_price.required' => 'Please add original price',
    //         'lower_price.required' => 'Please add lower price',
    //         'descrption.required' => 'Please add description',
    //         'category_id' => 'Please select category',
    //         'image' => 'Please add image'
    //     ];
    // }
}
