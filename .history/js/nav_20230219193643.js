function menu() {
  var html = "";
  html += `<div class="menu">
  <div class="toggle">
    <i class="fa fa-share" id="cart"></i>
  </div>
  <li style="--i: 5; --clr: #1877f2" id="statistics-order-food">
    <a
      style="text-decoration: none"
      href="../user/statistics-order-food.html"
      name=""
      data-bs-toggle="tooltip"
      title="Thống kê">
      <i class="fa fa-table-cells"></i>
    </a>
  </li>
  <li style="--i: 8; --clr: #25d366">
    <a
      style="text-decoration: none"
      href="../user/home.html"
      name="home"
      data-bs-toggle="tooltip"
      title="Trang chủ">
      <i class="fa fa-home"></i>
    </a>
  </li>
  <li style="--i: 7; --clr: #1da1f2">
    <a
      style="text-decoration: none"
      href="../user/list-order.html"
      name="listOrder"
      data-bs-toggle="tooltip"
      title="Danh sách">
      <i class="fa fa-list"></i>
    </a>
  </li>
  <li style="--i: 6; --clr: #ea4c89">
    <a
      href="../user/history-orders.html"
      style="text-decoration: none"
      data-bs-toggle="tooltip"
      title="Lịch sử đơn hàng">
      <i class="fa fa-history"></i>
    </a>
  </li>
  <li
    style="--i: 9; --clr: #c32aa3"
    data-bs-toggle="tooltip"
    title="Đổi mật khẩu">
    <a
      style="text-decoration: none"
      name="iformationUser"
      data-bs-toggle="modal"
      data-bs-target="#changePassword">
      <i class="fa fa-key"></i>
    </a>
  </li>
  <li style="--i: 10; --clr: #ff0000">
    <a
      style="text-decoration: none"
      href="../user/carts.html"
      class="shoppingCart"
      data-bs-toggle="tooltip"
      title="Giỏ hàng">
      <i
        class="fa fa-shopping-cart position-relative"
        style="font-size: 0.7em !important;">
        {" "}
      </i>
      <span
        class="position-absolute numbers_product text-white f-s-14 quanityProduct"
        style="color: red !important; top: 10%; left: 60%;--clr:#ea4c89 ">
        
      </span>
    </a>
  </li>
  <li style="--i: 12; --clr: #e62194" id="account_management">
    <a
      style="text-decoration: none"
      href="../admin/account_management.html"
      data-bs-toggle="tooltip"
      title="Quản lý tài khoản">
      <i class="fa fa-people-group"></i>
    </a>
  </li>
  <li style="--i: 11; --clr: #e62194" onclick="logout()">
    <a
      style="text-decoration: none"
      data-bs-toggle="tooltip"
      title="Đăng xuất">
      <i class="fa fa-right-from-bracket"></i>
    </a>
  </li>

  <div
    class="modal fade"
    id="changePassword"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content text-black">
        <div class="modal-header text-center">
          <span class="modal-title f-s-24" id="changePasswordLabel">
            Đổi mật khẩu
          </span>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body f-s-18 container">
          <form action="">
            <input
              type="text"
              class="mb-3 form-control"
              placeholder="Sô điện thoại"
              disabled
              id="phoneNumber_account"
            />
            <input
              type="password"
              class="mb-3 form-control"
              id="oldPassword"
              placeholder="Nhập mật khẩu cũ"
            />
            <div class="invalid-tooltip">Vui lòng nhập mật khẩu cũ</div>
            <input
              type="password"
              id="newPassword"
              class="mb-3 form-control"
              placeholder="Nhập mật khẩu mới"
            />
            <input
              type="password"
              id="repeatPassword"
              class="form-control"
              placeholder="Nhập lại mật khẩu mới"
            />
            <div style="text-align: start">
              <span
                id="validator-repeatPassword"
                class="f-s-14"
                style="color: red"></span>
            </div>
            <div class="justify-content-center text-center mt-3">
              <button
                type="button"
                onclick="changePassword()"
                class="btn btn-primary">
                Đồng ý
              </button>
              <button
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
                class="btn btn-danger">
                Hủy
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>`;
  $("#menu_nav").html(html);
  if (screen.width < 1340) {
    $(".toggle").click(() => {
      if ($(".menu").hasClass("active")) {
        $(".menu").removeClass("active");
        $(".container-list-food").css("display", "block");
        $(".menu .toggle").css("top", "0% !important");
        $(".menu .toggle").css("right", "0% !important");

        $("").add();
      } else {
        $(".menu").addClass("active");
        $(".container-list-food").css("display", "none");
      }
    });
  } else {
    $(".toggle").click(() => {
      if ($(".menu").hasClass("active")) {
        $(".menu").removeClass("active");
      } else {
        $(".menu").addClass("active");
      }
    });
  }
  var validatorRepeatPassword;
  $("#repeatPassword").keyup(function () {
    if ($("#newPassword").val() != $("#repeatPassword").val()) {
      validatorRepeatPassword = "Nhập lại mật khẩu mới không chính xác";
      $("#validator-repeatPassword").html(validatorRepeatPassword);
    } else {
      validatorRepeatPassword = "";
      $("#validator-repeatPassword").html(validatorRepeatPassword);
    }
  });
  // Initialize tooltips
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
}
$(document).ready(() => {
  menu();
});
function logout() {
  Swal.fire({
    title: "Thông báo!",
    text: "Đăng xuất thành công",
    icon: "success",
    confirmButtonText: "OK",
  }).then((result) => {
    delete_cookie("token");
    window.location.href = "../user/login.html";
  });
}
function changePassword() {
  $.ajax({
    url: "http://192.168.1.23:8386/users/changePassword",
    method: "POST",
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
    data: {
      oldPassword: $("#oldPassword").val(),
      newPassword: $("#newPassword").val(),
      repeatPassword: $("#repeatPassword").val(),
    },
    success: (data) => {
      if (data.status == 1) {
        Swal.fire({
          title: "Thông báo!",
          text: data.message,
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          delete_cookie("token");
          window.location.href = "../user/login.html";
        });
      } else {
        Swal.fire({
          title: "Thông báo!",
          text: data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
  });
}
function delete_cookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
