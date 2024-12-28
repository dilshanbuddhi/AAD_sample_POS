let cartdata= [];

const setcids = () => {
    $.ajax({
        url : "http://localhost:8080/Applicatoin1_Web_exploded/customer",
        method : 'GET',
        success : function (response) {
            let data = response;
            console.log(data);
            $('#customerSelect').empty();
            $('#customerSelect').append(`<option value="0">Select Customer</option>`);
            for (let i = 0; i < data.length; i++) {
                let row = `<option value="${data[i].id}">${data[i].id}</option>` ;
                $('#customerSelect').append(row);
            }
        },
        error : function (error){
            console.log(error)
        }
    })
        }

        setcids();

const setitemIds = () => {
    $.ajax({
        url : "http://localhost:8080/Applicatoin1_Web_exploded/item",
        method : 'GET',
        success : function (response) {
            let data = response;
            console.log(data);
            $('#itemSelect').empty();
            $('#itemSelect').append(`<option value="0">Select Item</option>`);
            for (let i = 0; i < data.length; i++) {
                let row = `<option value="${data[i].id}">${data[i].name}</option>` ;
                $('#itemSelect').append(row);
            }
        },
        error : function (error){
            console.log(error)
        }
    })
        }

        setitemIds();

$("#customerSelect").on('change', (e) => {
    let cid = e.target.value;
    console.log(cid);
    $.ajax({
        url : `http://localhost:8080/Applicatoin1_Web_exploded/customer`,
        method : 'GET',
        success : function (response) {
            let data = response;


            for (let i = 0; i < data.length; i++) {
                if(cid == data[i].id){
                    $('#cname').val(data[i].name);
                }
            }


        },
        error : function (error){
            console.log(error)
        }
    })
        })

        $("#itemSelect").on('change', (e) => {
            let iid = e.target.value;
            console.log(iid);
            $.ajax({
                url : `http://localhost:8080/Applicatoin1_Web_exploded/item`,
                method : 'GET',
                success : function (response) {
                    let data = response;
                    for (let i = 0; i < data.length; i++) {
                        if(iid == data[i].id){
                            $('#qtyOnHand').val(data[i].qty);
                            $('#unitPrice').val(data[i].price);
                        }
                    }
                },
                error : function (error){
                    console.log(error)
                }
            })
                })

$("#test").on("click", (e) => {
    console.log("test");
})

$("#placeOrder").click((e) =>  {
    console.log("fghjkl")
})

$("#cart_btn").click((e) => {
    console.log('cart button clicked');
    let cid = $('#customerSelect').val();
    let iid = $('#itemSelect').val();
    let qty = $('#qty').val();
    let unitPrice = $('#unitPrice').val();
    let total = $('#total').val();

    let cartobj = {cid, iid, qty, unitPrice, total};
    cartdata.push(cartobj);
    console.log(cartdata);

    loadCartDAta();
})

function loadCartDAta(){
    $('#ordertable').empty();
    for (let i = 0; i < cartdata.length; i++) {
        let row = `<tr>
        <td>${cartdata[i].cid}</td>
        <td>${cartdata[i].iid}</td>
        <td>${cartdata[i].qty}</td>
        <td>${cartdata[i].unitPrice}</td>
        <td>${cartdata[i].total}</td>
        </tr>`;
        $('#ordertable').append(row);
    }
}
