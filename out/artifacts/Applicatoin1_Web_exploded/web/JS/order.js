let cartdata= [];
let tot = 0;

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
                let row = `<option value="${data[i].id}">${data[i].id}</option>` ;
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


$("#cart_btn").click((e) => {
    console.log('cart button clickeddddd');
    let cid = $('#customerSelect').val();
    let iid = $('#itemSelect').val();
    let qty = $('#quantity').val();
    let unitPrice = $('#unitPrice').val();
    let total = qty * unitPrice;
    tot = tot + total;

    console.log(cid, iid, qty, unitPrice, total);

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

$("#placeOrder").click((e) => {
    let oid = 1;
    let cid = $('#customerSelect').val();
    let iid = $('#itemSelect').val();

            $.ajax({
                url : 'http://localhost:8080/Applicatoin1_Web_exploded/order',
                method : 'POST',
                data : {
                    cid: cid,
                    iid: iid,
                    total: tot,
                },

                success : function (response) {
                    console.log('order ekata data giya');
                    console.log(response);
                    orderdetails(oid);
                },
                error : function (error){
                    console.log(error)
                }
            })
        })

        function orderdetails(oid) {
            cartdata.forEach(element => {
                console.log(element.iid, element.qty);
                $.ajax({
                    url : 'http://localhost:8080/Applicatoin1_Web_exploded/orderdetails',
                    method : 'POST',
                    data : {
                        oid: oid,
                        iid : element.iid,
                    },
                    success : function (response) {
                        updateItems(element.iid, element.qty);
                    },
                    error : function (error){
                        console.log(error)
                    }
                })

            })
        }

        function updateItems(iid, qty) {
            $.ajax({
                url : 'http://localhost:8080/Applicatoin1_Web_exploded/orderdetails',
                method : 'PUT',
                data : JSON.stringify({
                    iid: iid,
                    qty: qty,
                }),
                success : function (response) {
                    console.log(response);
                },
                error : function (error){
                    console.log(error)
                }
            })
            }

