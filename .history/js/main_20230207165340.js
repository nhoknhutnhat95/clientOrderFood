//render list food


$(document).ready(() => {
    $.ajax({
        url: "http://192.168.1.22:8386/foods",

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
            <div class="card-body row mx-0 align-items-center p-2" style="border:none">
                <div class="col-lg-2 col-3">
                <img class = "w-100 img-item" src="${el.photos}" alt="">
                </div>
                <div class="col-lg-5 col-4">
                    <b><span class="f-s-18 name-item ">${el.name}</span></b>  <br>
                    <span class="description-item">${el.description}</span>
                </div>
                <div class="col-2 d-flex px-lg-2 px-0">
                    <span class="sale">${el.price}</span>
                    <span class="unit">${el.unit}</span>
                </div>
                <button class="col-sm-2 col-3 px-sm-2 px-0 btn btn-success f-s-12  addToCart">Thêm</button>
                
            </div>
          </div>`;
            });
            $("#list-food").html(cardListFood);
            let carts = document.querySelectorAll('.addToCart');
            for (let i = 0; i < carts.length; i++) {
                carts[i].addEventListener('click', () => {
                    cartNumbers(i,carts);
                })
            }
        },
    });
    // showCart()
});
// cart on homepage
// console.log(carts.length);
let products = [];

function onloadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.numbers_product').textContent = productNumbers;
    }
}
function cartNumbers(index,carts) {
    let productBox = carts[index].parentElement.parentElement;
    let productName = productBox.querySelector('.name-item').innerText;
    // console.log(productName);
    let productImg = productBox.querySelector('.img-item').src;
    let productDescription = productBox.querySelector('.description-item').innerText
    let productSale = productBox.querySelector('.sale').innerText;
    let unit = productBox.querySelector('.unit').innerText
    let productPrice = "";
    for (let i = 0; i < productSale.length; i++) {
        if (productSale[i] != ".") {
            productPrice += productSale[i];
        }
    }
    let productTag = "";
    for (let i = 0; i < productName.length; i++) {
        if (productName[i] != " ") {
            productTag += productName[i];
        }
    }
    let product = {
        photos: productImg,
        description: productDescription,
        unit:unit,
        name: productName,
        tag: productTag,
        price: productPrice,
        quantity: 0
    }
    products.push(product);
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.numbers_product').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.numbers_product').textContent = 1;
    }
    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }

        }
        cartItems[product.tag].quantity += 1;
    } else {
        product.quantity = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    totalCost(product);
}
function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');
    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        product.price = parseInt(product.price);
        localStorage.setItem('totalCost', cartCost + product.price)
    } else {
        product.price = parseInt(product.price);
        localStorage.setItem('totalCost', product.price);
    }
    showCart();
}
function showCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".showCart");
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map((elm, index) => {
            productContainer.innerHTML += `
            <div class="row" id="item${index}">
                      <div class="col">
                          <div class="card mb-2">
                              <div class="card-body row pt-1" style="align-items: center;">
                                  <div class="col-3 p-0">
                                      <img class="w-100" src="${elm.photos}" alt="">
                                  </div>
                                  <div class="col-9">
                                      <span class="name" style="font-size: 18px;" >${elm.name}</span><br>
                                      <span style="font-size: 15px;">${elm.description}</span>
                                  </div>
                              </div>
                              <div class="card-body row pt-0" style="align-items: center; ">
                                  <div class="col-7" >
                                    <span style="font-size: 18px;" >Giá tiền: ${elm.price} ${elm.unit}</span> <br>
                                    <span>Số lượng: ${elm.quantity} </span>
                                  </div>
                                  <div class="col-4">
                                      <i class="btn btn-success fa fa-plus" onclick = "plusQuanity()"></i>
                                      <i class="btn btn-warning fa fa-minus"></i>
                                      <button class="btn btn-danger deleteProduct"  onclick ="removeProduct(${index})">delete
                                      </button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
            `
        });
    }
    let summary = localStorage.getItem('totalCost');
    let sum = "";
    let count = 0;

    for (let i = (summary.length) - 1; 0 <=i; i--) {
        count++;
        sum += summary[i];
        if (count % 3 == 0 && i != 0) {
            sum += ".";
        }
    }
    let total = "";
    for (let i = 0; i < sum.length; i++) {
        total += sum[(sum.length) - i - 1];
    }
    document.querySelector('.sumTotal').textContent = total;
    // document.querySelector('.totalSum').textContent = total;
    // document.getElementById('#unit-item').textContent = total;

}

function removeProduct(i) {
    let del = document.querySelectorAll('.deleteProduct');
    let blockProduct = del[i].parentElement.parentElement.parentElement;
    let nameProduct = blockProduct.querySelector('.name').innerText;
    let tagProduct = "";
    for (let i = 0; i < nameProduct.length; i++) {
        if (nameProduct[i] != " ") {
            tagProduct += nameProduct[i];
        }
    }
    let keyProduct = localStorage.getItem('productsInCart');
    keyProduct = JSON.parse(keyProduct);
    let priceProduct = keyProduct[tagProduct].price;
    let quantityProduct = keyProduct[tagProduct].quantity;
    delete keyProduct[tagProduct];
    localStorage.setItem("productsInCart", JSON.stringify(keyProduct));
    let summary = localStorage.getItem("totalCost");
    let productNumbers = localStorage.getItem('cartNumbers');
    localStorage.setItem("cartNumbers", parseInt(productNumbers) - quantityProduct)
    localStorage.setItem("totalCost", parseInt(summary) - (priceProduct * quantityProduct))
    document.querySelector('.sumTotal').textContent = parseInt(summary) - (priceProduct * quantityProduct);
    // document.querySelector('.totalSum').textContent = parseInt(summary) - (priceProduct * quantityProduct);
    document.querySelector('.numbers_product').textContent = parseInt(productNumbers) - quantityProduct;
    blockProduct.remove();
    showCart();
}
showCart();
onloadCartNumbers();
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


