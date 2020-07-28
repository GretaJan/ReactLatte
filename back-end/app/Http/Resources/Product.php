<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Product extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        // return parent::toArray($request);

        return [
            'id' => $this->id,
            'category_id' => $this->category_id,
            'image' => $this->image,
            'title' => $this->title,
            'original_price'=> $this->original_price,
            'lower_price' => $this->lower_price,
            'description' => $this->description
        ];
    }
}
