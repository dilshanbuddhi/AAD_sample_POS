
    $('#save_btn').click((e) => {
    let name = $('#customerName').val();
    let address = $('#customerAddress').val();
    let tel = $('#customerTel').val();
    $.ajax({
    url : 'http://localhost:8080/Applicatoin1_Web_exploded/customer',
    method : 'POST',
    data : {
    name: name,
    address: address,
    tel: tel
    }
    ,
    success : function (response) {
    setcustomerdata();
},
    error : function (error){
    console.log(error)
}
})
})



    const setcustomerdata = () => {
    $.ajax({
        url : 'http://localhost:8080/Applicatoin1_Web_exploded/customer',
        method : 'GET',
        success : function (response) {
            let data = response;
            console.log(data);
            $('#customer_table_body').empty();
            for (let i = 0; i < data.length; i++) {
                let row = `<tr>
                        <td>${data[i].id}</td>
                        <td>${data[i].name}</td>
                        <td>${data[i].address}</td>
                        <td>${data[i].tel}</td>
                        <td>
                            <button type="button" class="btn btn-warning">Update</button>
                            <button type="button" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>`;
                $('#customer_table_body').append(row);
            }
        },
        error : function (error){
            console.log(error)
        }
    })
}

    setcustomerdata()


    $('#update_btn').click((e) =>{
    let id = $('#cid').val();
    let name = $('#customerName').val();
    let address = $('#customerAddress').val();
    let tel = $('#customerTel').val();
    console.log(id, name, address, tel);
    $.ajax({
    url : 'http://localhost:8080/Applicatoin1_Web_exploded/customer',

        method : 'PUT',
        contentType: 'application/json',

        data: JSON.stringify({
                id: id,
                name: name,
                address: address,
                tel: tel
            }),

     success : function (response) {
     setcustomerdata();
},
        error : function (error){
        console.log(error)
    }
    })
    })




    $('#customer_table_body').on('click', 'tr', (e) => {
    let id = $(e.target).closest('tr').find('td').eq(0).text();
    let name = $(e.target).closest('tr').find('td').eq(1).text();
    let address = $(e.target).closest('tr').find('td').eq(2).text();
    let tel = $(e.target).closest('tr').find('td').eq(3).text();
        $('#cid').val(id);
        $('#customerName').val(name);
        $('#customerAddress').val(address);
        $('#customerTel').val(tel);
        $('#update_btn').show();
        $('#save_btn').hide();
    })

    $("#clear_btn").click((e) => {
        $('#customerName').val('');
        $('#customerAddress').val('');
        $('#customerTel').val('');
        $('#update_btn').hide();
        $('#save_btn').show();
    } )


    $("#delete_btn").click((e) => {
        let id = $('#cid').val();
        console.log(id);
        $.ajax({
            url: `http://localhost:8080/Applicatoin1_Web_exploded/customer?id=${id}`,
            method : 'DELETE',
            success : function (response) {
                setcustomerdata();
                clear();
            },
            error : function (error){
                console.log(error)
            }
        })
    })



