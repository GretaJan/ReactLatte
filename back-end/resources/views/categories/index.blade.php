<h1>Index Categories</h1>


<table>
    <tr>
        <th>Image</th>
        <th>ID</th>
        <th>Name</th>
        <th>Action</th>
    </tr>
    @foreach($categories as $category)
        <tr>
            <td> <img src="{{$category->image}}" ></td>

            <td>{{$category->id}}</td>
        
            <td>{{$category->name}}</td> 
            <td>
                <p><a href="{{ url ('categories',['edit', $category->id])}}">Edit</a></p>
                <p>
                    <form action="{{ url('categories', $category->id)}}" method="post">
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