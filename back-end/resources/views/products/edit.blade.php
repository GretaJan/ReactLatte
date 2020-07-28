<h1>Edit Product: {{ $product->id }}. {{ $product->title }}</h1>

    <form method="post" action="{{url('products', $product->id)}}" enctype="multipart/form-data">
        {{csrf_field()}}
        {{method_field('PUT')}}
        <input name="title" placeholder="pavadinimas" value="{{ $product->title }}">
        <input name="original_price" placeholder="pradine kaina" value="{{ $product->original_price }}">
        <input name="lower_price" placeholder="kaina su nuolaida" value="{{ $product->lower_price }}">
        <input name="description" placeholder="apibūdinimas" value="{{ $product->description }}">
        <input type="file" name="image" placeholder="nuotrauka" value="">
        <select name="category_id">
            @foreach($categories as $category)
                <option value="{{$category->id}}">{{$category->id}}. {{$category->name}}</option>
            @endforeach
        </select>
        <button type="submit">Edit</button>
    </form>