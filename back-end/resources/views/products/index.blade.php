<h1>Index Product</h1>


<table>
    <tr>
        <th>Image</th>
        <th>ID</th>
        <th>Title</th>
        <th>Original Price</th>
        <th>Lower Price</th>
        <th>Description</th>
        <th>Categories</th>
        <th>Action</th>
    </tr>
    @foreach($products as $product)
        <tr>
            <td><img src="uploads/products/{{$product->image}}" ></td>

            <td>{{$product->id}}</td>
        
            <td>{{$product->title}}</td>
       
            <td>{{$product->original_price}}</td>
       
            <td>{{$product->lower_price}}</td>
       
            <td>{{$product->description}}</td>

            <td><p>{{$product->category->id}}
                {{$product->category->name}}
            </td> 
            <td>
                <p><a href="{{ url ('product',['edit', $product->id])}}">Edit</a></p>
                <p>
                    <form action="{{ url('products', $product->id)}}" method="post">
                        {{csrf_field()}}
                        {{method_field('DELETE')}}
                        <button>Delete</button>
                    </form>
                </p>
            </td>
        </tr>
    @endforeach    
</table>

<h1><a href="{{url('product','create')}}">Create new product</a></h1>
<h1><a href="{{url('category','create')}}">Create new category</a></h1>