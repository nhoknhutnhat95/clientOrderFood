function menu() {
  var html = "";
  html += `<div class="container-fluid">
  <div class="row" style="position: fixed; top: 30%; right: 0.6%; z-index: 1">
    <div class="col-sm-auto bg-dark sticky-top">
      <div class="d-flex flex-sm-column flex-row flex-nowrap bg-dark align-items-center sticky-top">
        <a href="../user/home.html" class="d-block p-3 link-light text-decoration-none" title=""
          data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Trang chủ">
          <i class="fa fa-home" style="font-size: 25px;"></i>
        </a>
        <ul
          class="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center align-items-center">
          <li class="nav-item">
            <a href="../user/list-order.html" class="nav-link link-light py-3 px-2" title="" data-bs-toggle="tooltip"
              data-bs-placement="right" data-bs-original-title="Danh sách">
              <i class="fa fa-list" style="font-size: 25px;"></i>
            </a>
          </li>
          <li>
            <a href="../user/history-orders.html" class="nav-link link-light py-3 px-2" title=""
              data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Lịch sử đơn hàng">
              <i class="fa fa-history" style="font-size: 25px;"></i>
            </a>
          </li>
          <li>
          <a title="Đổi mật khẩu" data-bs-toggle="tooltip" data-bs-placement="right">
          <button type="button" class="nav-link btn link-light py-3 px-2"  name="iformationUser"
              data-bs-toggle="modal" data-bs-target="#changePassword" "
              data-bs-original-title="Đổi mật khẩu">
              <i  class="fa fa-key" style="font-size: 25px;"></i>
            </button>
          </a>
            
          </li>
          <li>
            <a href="../user/carts.html" class="nav-link link-light py-3 px-2 position-relative" title="" data-bs-toggle="tooltip"
              data-bs-placement="right" data-bs-original-title="Giỏ hàng">
              <i class="fa fa-shopping-cart position-relative shopping-cart " style="font-size: 1.5rem !important;">

              </i>
            <span class="numbers_product position-absolute text-white" style="right: 3%;top:0%"></span>

            </a>
          </li>
          <li>
            <a href="../user/statistics-order-food.html" class="nav-link link-light py-3 px-2" title="" data-bs-toggle="tooltip"
              data-bs-placement="right" data-bs-original-title="Thống kê">

              <i class="fa fa-table-cells" style="font-size: 25px;"></i>

            </a>
          </li>
          <li>
            <a href="../admin/account_management.html" class="nav-link link-light py-3 px-2" title=""
              data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Quản lý tài khoản">
              <i class="fa fa-people-group" style="font-size: 25px;"></i>
            </a>
          </li>

          <li>
            <a onclick ="logout()" class="nav-link link-light py-3 px-2" title="" data-bs-toggle="tooltip"
              data-bs-placement="right" data-bs-original-title="Đăng xuất">
              <i class="fa fa-right-from-bracket" style="font-size: 25px;"></i>

            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="changePassword" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content text-black">
        <div class="modal-header text-center">
          <span class="modal-title f-s-24" id="changePasswordLabel">
            Đổi mật khẩu
          </span>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body f-s-18 container">
          <form action="">
            <input type="text" class="mb-3 form-control" placeholder="Sô điện thoại" disabled
              id="phoneNumber_account" />
            <input type="password" class="mb-3 form-control" id="oldPassword" placeholder="Nhập mật khẩu cũ" />
            <div class="invalid-tooltip">Vui lòng nhập mật khẩu cũ</div>
            <input type="password" id="newPassword" class="mb-3 form-control" placeholder="Nhập mật khẩu mới" />
            <input type="password" id="repeatPassword" class="form-control" placeholder="Nhập lại mật khẩu mới" />
            <div style="text-align: start">
              <span id="validator-repeatPassword" class="f-s-14" style="color: red"></span>
            </div>
            <div class="justify-content-center text-center mt-3">
              <button type="button" onclick="changePassword()" class="btn btn-primary">
                Đồng ý
              </button>
              <button type="button" data-bs-dismiss="modal" aria-label="Close" class="btn btn-danger">
                Hủy
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>`;

  $("#sidebar_navbar").html(html);
  // if (screen.width < 1340) {
  //   $(".toggle").click(() => {
  //     if ($(".menu").hasClass("active")) {
  //       $(".menu").removeClass("active");
  //       $(".container-list-food").css("display", "block");
  //       $(".menu .toggle").css("top", "0% !important");
  //       $(".menu .toggle").css("right", "0% !important");

  //       $("").add();
  //     } else {
  //       $(".menu").addClass("active");
  //       $(".container-list-food").css("display", "none");
  //     }
  //   });
  // } else {
  //   $(".toggle").click(() => {
  //     if ($(".menu").hasClass("active")) {
  //       $("#menu_nav").css({ top: "10%" });
  //       $(".menu").css({ width: "", height: "" });
  //       $(".menu").removeClass("active");
  //     } else {
  //       $(".menu").addClass("active");
  //       $("#menu_nav").css({ top: "30%" });
  //       $(".menu").css({ width: "300px", height: "100px" });
  //     }
  //   });
  // }
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
  var header = `<div class="container-fluid px-0" style="background-image: url('/img/imgheader.png');height: 500px;width: 100%;">
                  <div class="img-bottom" style="position: relative; bottom: -73%; width: 100%; z-index: 0;">
                    <img class="w-100" src="https://marketplace.foodotawp.com/wp-content/themes/foodota/libs/images/wave.svg"
                    alt="" style="opacity: 0.99;">
                  </div>
                <div class="row justify-content-center text-center text-white algin-items-center">
                <div class="col-8" style="position: absolute; top: 15%">
                  <div style="font-size: 6rem">Gọi món Minh Việt</div>
                  <br />
                  <div style="font-size: 4rem">
                    <span style="color: #ffcc00">Hỗ trợ:</span> 0398550111
                  </div>
                </div>
                </div>
                </div>`;
  $("#template_header").html(header);
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
  console.log(123);
  $.ajax({
    url: "http://192.168.1.19:8386/users/changePassword",
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
