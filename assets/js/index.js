$("#add_user").submit(function(event){
    alert("Data insertede successfuly");
})

$('#update_user').submit(function(event){
    event.preventDefault();

    let unindexd_array = $(this).serializeArray();
    console.log(unindexd_array)

    let data = {}

    $.map(unindexd_array, function(n, i){
        data[n['name']] = n['value']
    })

    console.log(data)

    let request = { 
        "url": `http://localhost:3000/api/users/${data.id}`,
        "method": "PUT",
        "data": data
    }
    
    $.ajax(request).done(function(response){
    alert('Data Updated Successfuly')})
})
if(window.location.pathname == '/'){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        let id = $(this).attr('data-id');

let request = {
    "url": `http://localhost:3000/api/users/${id}`,
    "method": "DELETE",
}
if(confirm('Are you sure you want to delete this user?')){
    $.ajax(request).done(function(response){
        alert('Data deleted successfully');
        location.reload();
    })
}
}
)}


