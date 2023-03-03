var current_page = 1;
var records_per_page = 10;
var dataAcc;
var arrPagination;

function getAllAccounts() {
  var arrUser;
  var arr = [];
  $.ajax({
    url: GVs.GETALLACCOUNT,
    type: "GET",
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
    success: (data) => {
      arrUser = data;
      // console.log(arrUser);
      var html = "";
      if (data.status == 0) {
        Swal.fire({
          title: "Thông báo!",
          text: data.message,
          icon: "error",
          confirmButtonText: "OK",
        }).then((result) => {
          window.location.href = "../user/home.html";
        });
      } else {
        dataAcc = data.data;
        check(current_page);
        arrPagination = pagination(current_page);
        // console.log(arrPagination);
        data.data.forEach((el, index) => {
          html += `<tr class="blockKey">
                              <td class="name">${el.name}</td>
                              <td class="phoneNumber">${el.phoneNumber}</td>
                              <td >${el.password}</td>
                              <td >${el.role}</td>
                              <td >
                                  <a class="add" title="Add" data-toggle="tooltip"><i
                                          class="material-icons" onclick="updateAccount('${el._id}')">&#xE03B;</i></a>
                                  <a class="edit"  title="Edit" data-toggle="tooltip"><i
                                          class="material-icons">&#xE254;</i></a>
                                  <a class="delete" title="Delete" data-toggle="tooltip"><i
                                          class="material-icons" id="deleteAccount" onclick="deleteAccount('${el._id}')">&#xE872;</i></a>
                              </td>
                          </tr>`;

          $("#data").html(html);
          arr.push(el);
          // localStorage.setItem("user", JSON.stringify(arr));
        });
        for (let index = 0; index < $(".btn_number").length; index++) {
          if (index >= numPages()) {
            $(".btn_number")[index].style.display = "none";
          } else {
            $(".btn_number")[index].style.display = "";
          }
        }
      }
    },
  });
}
$(document).ready(() => {
  changeValue();
  getAllAccounts();
});

function prevPage() {
  if (current_page > 1) {
    current_page--;
    // check(current_page);
    changeValue();
    getAllAccounts();
  }
}
function nextPage() {
  if (current_page < numPages()) {
    current_page++;
    // check(current_page);
    changeValue();
    getAllAccounts();
  }
}
function check(checkCurrent) {
  if (checkCurrent >= numPages()) {
    $("#btn_next").attr("disable", "disable");
    $("#btn_next").css("background-color", "#8d8f91");
  } else {
    $("#btn_next").attr("disable", "");
    $("#btn_next").css("background-color", "");
  }
  if (checkCurrent <= 1) {
    $("#btn_prev").attr("disable", "disable");
    $("#btn_prev").css("background-color", "#8d8f91");
  } else {
    $("#btn_prev").attr("disable", "");
    $("#btn_prev").css("background-color", "");
  }
}

function pagination(page) {
  var arr = [];
  dataAcc.forEach((element, index) => {
    if (
      index < page * records_per_page &&
      index >= (page - 1) * records_per_page
    ) {
      arr.push(element);
    }
  });
  return arr;
}

function numPages() {
  return Math.ceil(dataAcc.length / records_per_page);
}
function changeValue() {
  var arrnumber = [1, 2, 3];
  for (let index = 0; index < $(".btn_number .page-link").length; index++) {
    const element = $(".btn_number .page-link")[index];
    if (current_page < 3) {
      $(".btn_number .page-link")[index].setAttribute(
        "value",
        arrnumber[index]
      );
      $(".btn_number .page-link")[index].innerText = arrnumber[index];
    } else {
      var value = arrnumber[index] + current_page - 3;
      $(".btn_number .page-link")[index].setAttribute("value", value);
      $(".btn_number .page-link")[index].innerText = value;
    }
  }
}
for (let index = 0; index < $(".btn_number .page-link").length; index++) {
  const element = $(".btn_number .page-link")[index];
  element.addEventListener("click", () => {
    current_page = element.getAttribute("value");
    getAllAccounts();
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

function deleteAccount(id) {
  $(this).parents("tr").remove();
  $(".add-new").removeAttr("disabled");
  $.ajax({
    url: `${GVs.DELETEACCOUNT}/${id}`,
    type: "DELETE",
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
    success: (data) => {
      if (data.status == 1) {
        Swal.fire({
          title: "Thông báo!",
          text: data.message,
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          getAllAccounts();
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
// '<td><input type="text" class="form-control" name="role" id="role"></td>' +
$(".add-new").click(function () {
  $(this).attr("disabled", "disabled");
  var index = $("table tbody tr:last-child").index();
  var row =
    '<tr id ="new_add">' +
    '<td><input type="text" class="form-control" name="name" id="name"></td>' +
    '<td><input type="text" class="form-control" name="phoneNumber" id="phoneNumber"></td>' +
    '<td><input type="text" class="form-control" name="password" id="password"></td>' +
    `<td><select class = "form-select py-1" id="role">
    <option value="admin">Admin</option>
    <option value="user" selected>User</option>
  </select></td>` +
    `<td>
          <a class="add" title="Add" data-toggle="tooltip"><i class="material-icons" onclick="CreateAccount()">&#xE03B;</i></a>
          <a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
          <a class="delete" title="Delete"><i
          class="material-icons"onclick="cancel_add()">&#xE872;</i></a>
      </td>` +
    "</tr>";
  $("table").append(row);
  $("table tbody tr")
    .eq(index + 1)
    .find(".add, .edit")
    .toggle();
  $('[data-toggle="tooltip"]').tooltip();
  $("#phoneNumber").blur((val) => {
    var input = val.target.value;
    var regexPhoneNumber = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
    if (!regexPhoneNumber.test(input)) {
      Swal.fire({
        title: "Thông báo!",
        text: "Số điện thoại không đúng định dạng",
        icon: "error",
        confirmButtonText: "OK",
      }).then((result) => {
        val.target.value = "";
      });
    }
  });
  // $("#name").blur((val) => {
  //   var input = val.target.value;
  //   var re = /^[a-zA-Z!@#\$%\^\&*\)\(+=._-]{2,}$/g; // regex here

  //   if (!re.test(removeAscent(input))) {
  //     Swal.fire({
  //       title: "Thông báo!",
  //       text: "Tên không đúng định dạng",
  //       icon: "error",
  //       confirmButtonText: "OK",
  //     }).then((result) => {
  //       val.target.value = "";
  //     });
  //   }
  // });
});
function removeAscent(str) {
  if (str === null || str === undefined) return str;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  return str;
}
function cancel_add() {
  $("#new_add").remove();
  $(".add-new").prop("disabled", false);
}
function searchByName() {
  let input = document.getElementById("search").value;
  input = input.toLowerCase();
  let name = document.getElementsByClassName("name");
  let phoneNumber = document.getElementsByClassName("phoneNumber");

  for (i = 0; i < name.length; i++) {
    const blockKey = document.getElementsByClassName("blockKey");
    console.log(blockKey);
    if (
      !name[i].innerHTML.toLowerCase().includes(input) &&
      !phoneNumber[i].innerHTML.toLowerCase().includes(input)
    ) {
      blockKey[i].style.display = "none";
    } else {
      blockKey[i].style.display = "revert";
    }
  }
}

$("#search").keyup(() => {
  let input = document.getElementById("search").value;
  input = input.toLowerCase();

  // for (i = 0; i < phoneNumber.length; i++) {
  //   const blockKey = document.getElementsByClassName("blockKey");
  // }
});

$(document).on("click", ".edit", function () {
  $(this)
    .parents("tr")
    .find("td:not(:last-child)")
    .each(function (index) {
      if (index == 3) {
        var roleCurrent = this.textContent;
        $(this).html(
          `<select class = "form-select py-1" id="role">
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>`
        );
        var option = $(this).find("option");
        for (let index = 0; index < option.length; index++) {
          const element = option[index];
          console.log(element);
          if ($(element).val() == roleCurrent) {
            $(element).attr("selected", true);
          }
        }
      } else {
        $(this).html(
          '<input type="text" name="test[]" class="form-control" value="' +
            $(this).text() +
            '">'
        );
      }
    });
  $(this).parents("tr").find(".add, .edit").toggle();
  $(".add-new").attr("disabled", "disabled");
  $(".edit").css({ "pointer-events": "none" });
});

function updateAccount(id) {
  $(document).on("click", ".add", function () {
    var empty = false;
    var input = $(this).parents("tr").find('input[type="text"]');
    var select = $(this).parents("tr").find("#role");
    input.each(function () {
      if (!$(this).val()) {
        $(this).addClass("error");
        empty = true;
      } else {
        $(this).removeClass("error");
      }
    });
    $(this).parents("tr").find(".error").first().focus();
    if (!empty) {
      input.each(function () {
        $(this).parent("td").html($(this).val());
      });
      select.parent("td").html(select.val());
      $(this).parents("tr").find(".add, .edit").toggle();
      $(".add-new").removeAttr("disabled");
      $(".edit").css({ "pointer-events": "", display: "" });
      $(".add").css({ display: "none" });
    }
  });

  var arrInf = [];
  var inputs = $("input[name^=test]");
  for (i = 0; i < inputs.length; i++) {
    let el = inputs[i];
    arrInf.push(el.value);
  }
  var formData = {
    _id: id,
    name: arrInf[0],
    phoneNumber: arrInf[1],
    password: arrInf[2],
    role: $("#role").val(),
  };

  console.log(formData);

  // var test = $('input[name^=test]').map(el => $(el).val());
  $.ajax({
    url: GVs.UPDATEACCOUNT,
    type: "POST",
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
    data: formData,
    success: (data) => {
      if (data.status == 1) {
        Swal.fire({
          title: "Thông báo!",
          text: data.message,
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Thông báo!",
          text: data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
      // console.log('Account đã được cập nhật thành công');
    },
  });
}
function CreateAccount() {
  $(document).on("click", ".add", function () {
    var empty = false;
    var input = $(this).parents("tr").find('input[type="text"]');
    input.each(function () {
      if (!$(this).val()) {
        $(this).addClass("error");
        empty = true;
      } else {
        $(this).removeClass("error");
      }
    });
    $(this).parents("tr").find(".error").first().focus();
    if (!empty) {
      input.each(function () {
        $(this).parent("td").html($(this).val());
      });
      console.log();
      $(this).parents("tr").find(".add, .edit").toggle();
      $(".add-new").removeAttr("disabled");
    }
  });

  var name = $("#name").val();

  var formData = {
    name: $("#name").val(),
    phoneNumber: $("#phoneNumber").val(),
    password: $("#password").val(),
    role: $("#role").val(),
  };

  console.log(formData);

  $.ajax({
    url: GVs.ADDACCOUNT,
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
    method: "POST",
    data: formData,
    success: (data) => {
      console.log(data);
      if (data.status == 1) {
        Swal.fire({
          title: "Thông báo!",
          text: data.message,
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          getAllAccounts();
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
