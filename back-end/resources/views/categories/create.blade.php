<h1>Create Category</h1>

<form method="post" action="{{ url('/categories') }}" enctype="multipart/form-data">
    <!-- {{ csrf_field() }} -->
    <input name="name" placeholder="pavadinimas" value="">
    <input type="file" name="image"  value="">
    <button type="submit">Submit</button>
</form>