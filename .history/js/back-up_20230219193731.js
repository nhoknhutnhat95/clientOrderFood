
// console.log(window.location);
$(document).ready(() => {
    $.ajax({
        url: "http://192.168.1.23:8386/foods",

        type: "GET",

        headers: {
            Authorization: `Bearer ${getCookie("token")}`,
        },
        success: function (data) {
            var cardListFood = "";
            // console.log(data);
            // localStorage.setItem("order", JSON.stringify(data));
            menu = data;
            // console.log(data);
            data.forEach((el, index) => {
                cardListFood += `<div class="card mt-3 ">
                <!-- <div class="card-header">
                  Name
                </div> -->
                <div class="card-body row align-items-center p-2">
                    <div class="col-2">
                  <img class = "w-100" src="${el.photos}" alt="">
                    </div>
                    <div class="col-6">
                        <span class="f-s-18">${el.name}</span> <br>
                        <span>${el.description}</span>
                    </div>
                    <div class="col-2">
                        <span>${el.price}${el.unit}</span>
                    </div>
                    <div class="col-1">

                         <i class="btn btn-danger fa fa-plus" onclick = "addCart(${index})"></i>

                    </div>
                </div>
              </div>`;

                //     html += `<tr class="">
                // <th scope="row">${index + 1}</th>
                // <td id="name-food"> ${el.name}</td>
                // <td id="photo-food"><img src="${el.photos}" alt=""></td>
                // <td id="description-food">${el.description}</td>
                // <td id="price-food">${el.price} ${el.unit}</td>
                // <td id="totallike-food">${el.total_like}</td>
                // <td id="add">
                //      <button class="btn btn-success" onclick ="addOrder(${index})" >Add</button>
                // </td>
                // <td id="delete"> <button class="btn btn-danger" onclick ="deleteOrder(${index})" >Delete</button> </td>
                // </tr>`
            });
            $("#list-food").html(cardListFood);
        },
    });
    showCart();
});

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
var arr = [];
var cartListFood = "";
var cartListFoods = [];
var quantityFood = 0;
function addCart(index) {
    arr.push(menu[index]);
    var items = [
        {
            id: arr[0].id,
            name: arr[0].name,
            photos: arr[0].photos,
            price: arr[0].price,
            description: arr[0].description,
            unit: arr[0].unit,
            arr: [arr[0]],
        },
    ];
    for (var i = 1; i < arr.length; i++) {
        if (arr[i].id == items[items.length - 1].id) {
            items[items.length - 1].arr.push(arr[i]);
        } else {
            items.push({
                id: arr[i].id,
                name: arr[i].name,
                photos: arr[i].photos,
                price: arr[i].price,
                description: arr[i].description,
                unit: arr[i].unit,
                arr: [arr[i]],
            });
        }
    }
    console.log(items);
    localStorage.setItem("order", JSON.stringify(items));
    // showCart();
}

function showCart() {
    var setOrderLocal = JSON.parse(localStorage.getItem("order"));
    console.log(setOrderLocal);
    setOrderLocal.forEach((elm, index) => {
        cartListFood += `<div class="row" id="item${index}">
                      <div class="col">
                          <div class="card mb-2">
                              <div class="card-body row pt-1" style="align-items: center;">
                                  <div class="col-3 p-0">
                                      <img class="w-100" src="${elm.photos}" alt="">
                                  </div>
                                  <div class="col-9">
                                      <span style="font-size: 18px;" >${elm.name}</span><br>
                                      <span style="font-size: 15px;">${elm.description}</span>
                                  </div>
                              </div>
                              <div class="card-body row pt-0" style="align-items: center; ">
                                  <div class="col-7" >
                                    <span style="font-size: 18px;" >Giá tiền: ${elm.price} ${elm.unit}</span> <br>
                                    <span>Số lượng: ${quantityFood} </span>
                                  </div>
                                  <div class="col-4">
                                      <i class="btn btn-success fa fa-plus" onclick = "plusQuanity()"></i>
                                      <i class="btn btn-warning fa fa-minus"></i>
                                      <button class="btn btn-danger"  onclick ="deleteProduct(${index})">delete
                                      </button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>`;
    });

    $("#cart-list-food").html(cartListFood);
}
function deleteProduct(index) {
    // console.log(1);
    var setOrderLocal = JSON.parse(localStorage.getItem("order"));
    var newSetOrderLocal = setOrderLocal.splice(index);
    console.log(newSetOrderLocal);
    localStorage.setItem("order", JSON.stringify(newSetOrderLocal));
    $(`#item${index}`).remove();
    // showCart();
}