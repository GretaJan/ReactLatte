Show {{$product->title}}

<table>
    <tr>
        <th>Title</th>
        <th>original_price</th>
        <th>lower_price</th>
        <th>Kategorija</th>
    </tr>
    <tr>
        <td>{{ $product->title }}</td>
        <td>{{ $product->original_price }}</td>
        <td>{{ $product->lower_price }}</td>
        <td>{{ $product->description }}</td>
        <td>{{ $product->category->name }}</td>
    </tr>
</table>