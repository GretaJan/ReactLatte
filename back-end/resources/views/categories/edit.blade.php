<h1>Edit Category: {{ $category->id }}. {{ $category->name }}</h1>

<form method="post" action="{{ url('categories', $category->id) }}" enctype="multipart/form-data">
    {{csrf_field()}}
    {{method_field('PUT')}}
    <input name="name" placeholder="pavadinimas" value="{{ $category->name }}">
    <input type="file" name="image"  value="">
    <button type="submit">Edit</button>
</form>