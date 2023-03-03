class GVs {
  // static SERVERNAME = "http://192.168.1.57:8386";
  static SERVERNAME = "http://192.168.1.64:8386"
  //   static SERVERNAME = "tienganhtieuhoc.com.vn";
  static LOGIN = this.SERVERNAME + "/users/login";
  static LOGOUT = this.SERVERNAME + "/users/logout";
  static GETALLFOOD = this.SERVERNAME + "/foods";
  static GETLISTORDER = this.SERVERNAME + "/orders/getListOrders";
  static GETHISTORYORDERS = this.SERVERNAME + "/orders/getHistoryOrders";
  static CANCELORDERS = this.SERVERNAME + "/orders/cancelOrders";
  static GETORDER = this.SERVERNAME + "/orders/getOrder";
  static GETSTATISTICS = this.SERVERNAME + "/orders/getStatistics";
  static CREATEORDER = this.SERVERNAME + "/orders/create";

  //! admin
  static UPDATEFOODS = this.SERVERNAME + "/foods/updateFoods";
  static GETALLACCOUNT = this.SERVERNAME + "/users/getAllAccounts";
  static DELETEACCOUNT = this.SERVERNAME + "/users/deleteAccount";
  static UPDATEACCOUNT = this.SERVERNAME + "/users/updateAccount";
  static ADDACCOUNT = this.SERVERNAME + "/users/signUp";
}
