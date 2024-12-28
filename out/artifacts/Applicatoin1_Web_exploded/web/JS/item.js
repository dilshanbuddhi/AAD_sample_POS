

const setAllItems = () => {
    $.ajax({
        url: 'http://localhost:8080/Applicatoin1_Web_exploded/item',
        method: 'GET',
        success: function (response) {
            let data = response;
            console.log(response);
            $('#itemTable').empty();
            data.map(
                (item) => {
                    let row = `<tr>
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>${item.des}</td>
                        <td>${item.price}</td>
                        <td>${item.qty}</td>
                
                    </tr>`;
                    $('#itemTable').append(row);
                }
            )
        },
        error: function (error) {
            console.log(error)
        }
    })
}

setAllItems();


    $("#itemSaveBtn").click((e) => {
        console.log('clicked');
        let name = $('#itemName').val();
        let description = $('#itemDescription').val();
        let price = $('#itemPrice').val();
        let quantity = $('#itemQuantity').val();

        console.log(name , description , price , quantity);
        $.ajax({
            url : 'http://localhost:8080/Applicatoin1_Web_exploded/item',
            method : 'POST',
            data : {
                name: name,
                des: description,
                price: price,
                qty: quantity
            }
            ,
            success : function (response) {
                setAllItems();
            },
            error : function (error){
                console.log(error)
            }
    })
    })

$("#updateBtn").click((e) => {
    let id = $('#itemId').val();
    let name = $('#itemName').val();
    let description = $('#itemDescription').val();
    let price = $('#itemPrice').val();
    let quantity = $('#itemQuantity').val();
    $.ajax({
        url : 'http://localhost:8080/Applicatoin1_Web_exploded/item',
        method : 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({
            id: id,
            name: name,
            des: description,
            price: price,
            qty: quantity
        }),
        success : function (response) {
            setAllItems();
            clear();
        },
        error : function (error){
            console.log(error)
        }
    })
})


$("#deleteBtn").click((e) => {
    let id = $('#itemId').val();
    $.ajax({
        url : `http://localhost:8080/Applicatoin1_Web_exploded/item?id=${id}`,
        method : 'DELETE',
        contentType: 'application/json',

        success : function (response) {
            setAllItems();
            clear();

        },
        error : function (error){
            console.log(error)
        }
    })
})

$("#itemTable").on('click', 'tr', function () {
    let id = $(this).find('td').eq(0).text();
    let name = $(this).find('td').eq(1).text();
    let description = $(this).find('td').eq(2).text();
    let price = $(this).find('td').eq(3).text();
    let quantity = $(this).find('td').eq(4).text();
    $('#itemId').val(id);
    $('#itemName').val(name);
    $('#itemDescription').val(description);
    $('#itemPrice').val(price);
    $('#itemQuantity').val(quantity);
    $("#itemSaveBtn").hide();

})

$("#clearBtn").click((e) => {
  clear()
})

const clear = () => {
    $('#itemId').val('');
    $('#itemName').val('');
    $('#itemDescription').val('');
    $('#itemPrice').val('');
    $('#itemQuantity').val('');
    $("#saveBtn").show();
    $("#updateBtn").hide();
    $("#deleteBtn").hide();
}
