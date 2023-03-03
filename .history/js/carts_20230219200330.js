showPageCart();
// <th scope="col">STT</th>
// <th scope="col">Ảnh món</th>
// <th scope="col">Tên món</th>
// <th scope="col">Mô tả</th>
// <th scope="col">Số lượng</th>
// <th scope="col">Thành tiền</th>
function showPageCart() {
  let cartItems = localStorage.getItem("productsInCart");
  let numberItems = localStorage.getItem("cartNumbers");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.getElementById("productPageCart");
  if (cartItems && productContainer && numberItems > 0) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item, index) => {
      productContainer.innerHTML += `
            <tr>
                <td class="align-middle">${index + 1}</td>    
                <td  class="align-middle"><img src="${
                  item.photos
                }" class="productPageCart_img w-100"></td>
                <td class="align-middle  productPageCart_name text-break" >${
                  item.name
                }</td>
                <td class="align-middle productPageCart_description text-break" >${
                  item.description
                }</td>
                <td class="align-middle">
                <button class="btn btn-warning text-white f-s-20 dec-button" class="spinner-button" onclick="subNumber(${index})" >-</button>
                <input type="number" min="1" max="50" step="1" value="${
                  item.quantity
                }" class="productPageCart_sl">
                <button class="btn btn-success f-s-20 inc-button" class="spinner-button" onclick="addNumber(${index})" >+</button>
                </td>
                <td class="align-middle productPageCart_price"><pre class=""> ${
                  item.price
                } ${item.unit}</pre></td>
                <td class="align-middle productPageCart_tt"><pre class="">${
                  Number(item.price) * item.quantity
                } ${item.unit}</pre></td>
                <td class="align-middle"><button class="btn btn-danger  deleteProductCart"   onclick="removeProductCart(${index})"><i class="far fa-trash-alt "></i></button></td>  
            </tr> 
            `;
    });
  } else {
    productContainer.innerHTML = `
            <tr>
                <td colspan="8" class="f-s-20">Giỏ hàng rỗng</td>
            </tr>
        `;
  }
  let summary = localStorage.getItem("totalCost");
  let sum = "";
  let count = 0;

  for (let i = summary.length - 1; i >= 0; i--) {
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
  document.querySelector(".totalSumCart").textContent = total + " đ";
  // document.querySelector('.totalSum').textContent=total;
  document.querySelector(".numbers_product").textContent = numberItems;
  let quantityProductBlur = document.querySelectorAll(".productPageCart_sl");
  for (let i = 0; i < quantityProductBlur.length; i++) {
    quantityProductBlur[i].addEventListener("blur", () => {
      console.log("ok");
      updateQuantityProduct(i);
    });
  }
}
function removeProductCart(i) {
  let delProduct = document.querySelectorAll(".deleteProductCart");
  let blockProduct = delProduct[i].parentElement.parentElement;
  blockProduct.remove();
  let nameProduct = blockProduct.querySelector(
    ".productPageCart_name"
  ).innerText;
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
  document.querySelector(".totalSumCart").textContent =
    parseInt(summary) - priceProduct * quantityProduct;
  // document.querySelector('.totalSum').textContent=parseInt(summary)-(priceProduct*quantityProduct);
  document.querySelector(".numbers_product").textContent =
    parseInt(productNumbers) - quantityProduct;
  showPageCart();
}
function onloadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.querySelector(".numbers_product").textContent = productNumbers;
  }
}
function updateQuantityProduct(i) {
  let quantityProductBlur = document.querySelectorAll(".productPageCart_sl");
  let new_quantityProduct = quantityProductBlur[i].value;
  let blockProduct = quantityProductBlur[i].parentElement.parentElement;
  let nameProduct = blockProduct.querySelector(
    ".productPageCart_name"
  ).innerText;
  let tagProduct = "";
  for (let i = 0; i < nameProduct.length; i++) {
    if (nameProduct[i] != " ") {
      tagProduct += nameProduct[i];
    }
  }
  let keyProduct = localStorage.getItem("productsInCart");
  let productNumber = parseInt(localStorage.getItem("cartNumbers"));
  keyProduct = JSON.parse(keyProduct);
  let quantityProduct = parseInt(keyProduct[tagProduct].quantity);
  if (
    quantityProduct <= 50 &&
    new_quantityProduct <= 50 &&
    new_quantityProduct > 0
  ) {
    productNumber = productNumber - quantityProduct;
    productNumber += parseInt(new_quantityProduct);
    let summary = parseInt(localStorage.getItem("totalCost"));
    let priceProduct = parseInt(keyProduct[tagProduct].price);
    summary = summary - quantityProduct * priceProduct;
    quantityProduct = new_quantityProduct;
    keyProduct[tagProduct].quantity = quantityProduct;
    localStorage.setItem("productsInCart", JSON.stringify(keyProduct));
    localStorage.setItem("cartNumbers", productNumber);
    localStorage.setItem("totalCost", summary + priceProduct * quantityProduct);
    document.querySelector(".totalSumCart").textContent =
      summary + priceProduct * quantityProduct;
    document.querySelector(".productPageCart_tt").textContent =
      priceProduct * quantityProduct;
  } else if (new_quantityProduct > 50) {
    alert("Khách hàng chỉ được mua tối đa 50 món cùng loại");
  } else {
    if (confirm("Khách hàng muốn xóa sản phẩm này khỏi giỏ hàng ?") == true) {
      removeProductCart(i);
    }
  }
  showPageCart();
}
function addNumber(i) {
  let addBlock = document.querySelectorAll(".inc-button");
  document.getElementsByClassName("productPageCart_sl")[i].stepUp(1);
  let blockProduct = addBlock[i].parentElement.parentElement;
  let nameProduct = blockProduct.querySelector(
    ".productPageCart_name"
  ).innerText;
  // console.log(nameProduct);
  let tagProduct = "";
  for (let i = 0; i < nameProduct.length; i++) {
    if (nameProduct[i] != " ") {
      tagProduct += nameProduct[i];
    }
  }
  let keyProduct = localStorage.getItem("productsInCart");
  let productNumber = parseInt(localStorage.getItem("cartNumbers"));
  keyProduct = JSON.parse(keyProduct);
  let quantityProduct = parseInt(keyProduct[tagProduct].quantity);
  if (quantityProduct < 50) {
    quantityProduct += 1;
    productNumber += 1;
    keyProduct[tagProduct].quantity = quantityProduct;
    localStorage.setItem("productsInCart", JSON.stringify(keyProduct));
    localStorage.setItem("cartNumbers", productNumber);
    let summary = parseInt(localStorage.getItem("totalCost"));
    let priceProduct = parseInt(keyProduct[tagProduct].price);
    localStorage.setItem("totalCost", summary + priceProduct);
    document.querySelector(".totalSumCart").textContent =
      summary + priceProduct;
    document.querySelector(".productPageCart_tt").textContent =
      priceProduct * quantityProduct;
  } else {
    alert("Khách hàng chỉ được mua tối đa 50 cái đồng hồ cùng loại");
  }
  showPageCart();
}
function subNumber(i) {
  let subBlock = document.querySelectorAll(".dec-button");
  document.getElementsByClassName("productPageCart_sl")[i].stepUp(-1);
  let blockProduct = subBlock[i].parentElement.parentElement;
  let nameProduct = blockProduct.querySelector(
    ".productPageCart_name"
  ).innerText;
  let tagProduct = "";
  for (let i = 0; i < nameProduct.length; i++) {
    if (nameProduct[i] != " ") {
      tagProduct += nameProduct[i];
    }
  }
  let keyProduct = localStorage.getItem("productsInCart");
  let productNumber = parseInt(localStorage.getItem("cartNumbers"));
  keyProduct = JSON.parse(keyProduct);
  let quantityProduct = parseInt(keyProduct[tagProduct].quantity);
  if (quantityProduct > 1) {
    quantityProduct -= 1;
    productNumber -= 1;
    keyProduct[tagProduct].quantity = quantityProduct;
    localStorage.setItem("productsInCart", JSON.stringify(keyProduct));
    localStorage.setItem("cartNumbers", productNumber);
    let summary = parseInt(localStorage.getItem("totalCost"));
    let priceProduct = parseInt(keyProduct[tagProduct].price);
    localStorage.setItem("totalCost", summary - priceProduct);
    document.querySelector(".totalSumCart").textContent =
      summary - priceProduct;
    document.querySelector(".productPageCart_tt").textContent =
      priceProduct * quantityProduct;
  } else {
    if (confirm("Khách hàng muốn xóa sản phẩm này khỏi giỏ hàng ?") == true) {
      removeProductCart(i);
    }
  }
  showPageCart();
}

function sendCarts() {
  let numberItems = localStorage.getItem("cartNumbers");
  // console.log(arr);
  // var x = JSON.parse(cards);
  if (numberItems > 0) {
    var cards = localStorage.getItem("productsInCart");
    let arr = Object.values(JSON.parse(cards));
    $.ajax({
      url: "http://192.168.1.23:8386/orders/create",
      type: "POST",
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
      data: {
        dishes: JSON.stringify(arr),
      },
      success: (data) => {
        console.log();
        localStorage.clear();
        if (data.status == 1) {
          Swal.fire({
            title: "Gửi đơn hàng thành công!",
            // text: datas.message,
            icon: "success",
            confirmButtonText: "OK",
          })
            // console.log('Đơn hàng đã được gửi');
            // console.log(arr);
            .then((result) => {
              window.location.href = "./history-orders.html";
            });
        }
        // console.log(data);
      },
    });
  } else {
    Swal.fire({
      title: "Gửi đơn hàng thất bạn!",
      text: "Đơn hàng của bạn đang rỗng",
      icon: "error",
      confirmButtonText: "OK",
    });
    // alert("Giỏ hàng của bạn đang rỗng")
  }
}
function cancelOrders() {
  $.ajax({
    url: "http://192.168.1.60:8386/orders/cancelOrders",
    type: "DELETE",
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
    // data: {
    //     datas:JSON.stringify(arr)
    // },
    success: () => {
      console.log("Xóa thành công");
      // console.log(arr);
    },
  });
}
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
onloadCartNumbers();

//Tooltip
var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});
