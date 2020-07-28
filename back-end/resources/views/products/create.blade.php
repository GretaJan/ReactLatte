<h1>Create Product</h1>



<form method="post" action="{{url('/products')}}" enctype="multipart/form-data">
{{csrf_field()}}
<input name="title" placeholder="pavadinimas" value="">
<input name="original_price" placeholder="pradine kaina" value="">
<input name="lower_price" placeholder="kaina su nuolaida" value="">
<input name="description" placeholder="apibūdinimas" value="">
<input type="file" name="image" placeholder="nuotrauka" value="">
<select name="category_id">
    @foreach($categories as $category)
        <option value="{{$category->id}}">{{$category->id}}. {{$category->name}}</option>
    @endforeach
</select>
<button type="submit">Submit</button>
</form>


