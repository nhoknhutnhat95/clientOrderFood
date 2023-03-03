//render list food

$(document).ready(() => {
  $.ajax({
    url: GVs.GETALLFOOD,

    type: "GET",

    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
    success: function (data) {
      console.log(data);
      if (data.status == 0) {
        Swal.fire({
          title: "Thông báo!",
          text: data.message,
          icon: "error",
          confirmButtonText: "OK",
        }).then((result) => {
          window.location.href = "../user/login.html";
        });
      } else {
        // if (data.role == "user") {
        //   $("#statistics-order-food").remove();
        //   $("#account_management").remove();
        // }
        $("#phoneNumber_account").attr("placeholder", data.phoneNumber);
        $("#nameUser").text(data.username);
        $("#nameAccount").text("Tên: " + data.username);
        $("#phoneAccount").text("Sô điện thoại: " + data.phoneNumber);
        // $("#passwordAccount").text(data.password);
        console.log(data);
        var cardListFood = "";
        // console.log(data);
        // localStorage.setItem("order", JSON.stringify(data));
        menu = data;
        // console.log(data);
        function formatNumber(num) {
          return ("" + num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, function ($1) {
            return $1 + ".";
          });
        }
        data.foods.forEach((el, index) => {
          // console.log(el);
          cardListFood += `<div class="col-lg-6 mb-5">
            <div class="row justify-content-center">
              <div class="col-10 ">
                <div class="row justify-content-center item hover_card" style="border-radius: 2% ; border: 1px solid #727272;">
                  <div class="col-5 d-flex algin-items-center ps-0">
                    <div class="d-none">
                      <span class="_id">${el._id}</span>
                    </div>

                      <img
                      class=" img-fluid img-item "
                      src="${
                        el.photos
                      }" style="border-radius: 2% 0 0 2%;width:350px;"
                      alt="">
                    
                  </div>
                  <div class="col-7 px-4 py-4">
                    <div class="title f-s-24 name-item" style=" font-family: sans-serif; font-weight: bold;">${
                      el.name
                    }</div>
                    <p class="text-break f-s-18 description-item">${
                      el.description
                    }</p>
                    <div class="d-flex justify-content-between">
                      <div class="d-flex">
                        <span class="price f-s-24 sale" style=" font-family: sans-serif; font-weight: bold;">${formatNumber(
                          el.price
                        )} </span>
                        <span class="unit" style=" font-family: sans-serif; font-weight: bold;">${
                          el.unit
                        }</span>
                      </div>

                      <buttton id="addtocart" class="btn btn-danger addToCart add-to-cart" style="border: 1px solid ">Add to cart</buttton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
        });
        $("#data_foods").html(cardListFood);
        $(".addToCart").on("click", function () {
          // console.log($(this).parent().parent().parent('.item'));
          var cart = $(".shopping-cart");
          var imgtodrag = $(this).parent().parent().parent(".item").find("img");
          console.log(imgtodrag);
          if (imgtodrag) {
            var imgclone = imgtodrag
              .clone()
              .offset({
                top: imgtodrag.offset().top,
                left: imgtodrag.offset().left,
              })
              .css({
                opacity: "0.5",
                position: "absolute",
                height: "3px !important",
                width: "3px !important",
                "z-index": "100",
              })
              .appendTo($("body"))
              .animate(
                {
                  top: cart.offset().top + 10,
                  left: cart.offset().left + 10,
                  width: 75,
                  height: 75,
                },
                1000,
                "easeInOutExpo"
              );

            setTimeout(function () {
              cart.effect(
                "shake",
                {
                  times: 1,
                },
                200
              );
            }, 1500);

            imgclone.animate(
              {
                width: 0,
                height: 0,
              },
              function () {
                $(this).detach();
              }
            );
          }
        });
        let carts = document.querySelectorAll(".addToCart");
        for (let i = 0; i < carts.length; i++) {
          carts[i].addEventListener("click", () => {
            cartNumbers(i, carts);
          });
        }
      }
    },
  });
  // showCart()
});

// cart on homepage
// console.log(carts.length);
let products = [];

function onloadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  // console.log(productNumbers);
  // if (productNumbers) {
  //   document.querySelector(".numbers_product").textContent = productNumbers;
  // }
}
function cartNumbers(index, carts) {
  let productBox = carts[index].parentElement.parentElement.parentElement;
  // console.log(productBox);
  let productName = productBox.querySelector(".name-item").innerText;
  // console.log(productName);
  let productImg = productBox.querySelector(".img-item").src;
  let productDescription =
    productBox.querySelector(".description-item").innerText;
  let productSale = productBox.querySelector(".sale").innerText;
  let unit = productBox.querySelector(".unit").innerText;
  let _id = productBox.querySelector("._id").innerText;
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
    unit: unit,
    _id: _id,
    name: productName,
    tag: productTag,
    price: productPrice,
    quantity: 0,
  };
  products.push(product);
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".numbers_product").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".numbers_product").textContent = 1;
  }
  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].quantity += 1;
  } else {
    product.quantity = 1;
    cartItems = {
      [product.tag]: product,
    };
  }
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
  totalCost(product);
}
function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");
  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    product.price = parseInt(product.price);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    product.price = parseInt(product.price);
    localStorage.setItem("totalCost", product.price);
  }
  showCart();
}
function showCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".showCart");
  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
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
                                      <span class="name" style="font-size: 18px;" ><b>${elm.name}</b></span><br>
                                      <span style="font-size: 15px;">${elm.description}</span>
                                  </div>
                              </div>
                              <div class="card-body row pt-0" style="align-items: center; ">
                                  <div class="col-7" >
                                    <span style="font-size: 18px;" ><b>Giá tiền:</b> ${elm.price} ${elm.unit}</span> <br>
                                    <span><b>Số lượng:</b> ${elm.quantity} </span>
                                  </div>
                                  <div class="col-4">
                                    
                                      <button class="btn btn-danger deleteProduct"  onclick ="removeProduct(${index})">Xóa
                                      </button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
            `;
    });
  }
  let summary = localStorage.getItem("totalCost");
  let sum = "";
  let count = 0;

  for (let i = summary.length - 1; 0 <= i; i--) {
    count++;
    sum += summary[i];
    if (count % 3 == 0 && i != 0) {
      sum += ".";
    }
  }
  let total = "";
  for (let i = 0; i < sum.length; i++) {
    total += sum[sum.length - i - 1];
  }
  // console.log(total);
  document.querySelector(".sumTotal").textContent = total;
  // console.log(total);
  // document.querySelector('.totalSum').textContent = total;
  // document.getElementById('#unit-item').textContent = total;
}

function removeProduct(i) {
  let del = document.querySelectorAll(".deleteProduct");
  let blockProduct = del[i].parentElement.parentElement.parentElement;
  let nameProduct = blockProduct.querySelector(".name").innerText;
  let tagProduct = "";
  for (let i = 0; i < nameProduct.length; i++) {
    if (nameProduct[i] != " ") {
      tagProduct += nameProduct[i];
    }
  }
  let keyProduct = localStorage.getItem("productsInCart");
  keyProduct = JSON.parse(keyProduct);
  let priceProduct = keyProduct[tagProduct].price;
  let quantityProduct = keyProduct[tagProduct].quantity;
  delete keyProduct[tagProduct];
  localStorage.setItem("productsInCart", JSON.stringify(keyProduct));
  let summary = localStorage.getItem("totalCost");
  let productNumbers = localStorage.getItem("cartNumbers");
  localStorage.setItem(
    "cartNumbers",
    parseInt(productNumbers) - quantityProduct
  );
  localStorage.setItem(
    "totalCost",
    parseInt(summary) - priceProduct * quantityProduct
  );
  document.querySelector(".sumTotal").textContent =
    parseInt(summary) - priceProduct * quantityProduct;
  // document.querySelector('.totalSum').textContent = parseInt(summary) - (priceProduct * quantityProduct);
  document.querySelector(".numbers_product").textContent =
    parseInt(productNumbers) - quantityProduct;
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
console.log(localStorage.getItem("cartNumbers"));
