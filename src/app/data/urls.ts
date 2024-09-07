export class Urls {
  private baseUrl = 'https://greenland-rest.com/v1/su/api/';
  private base2Url = 'su1/';

  loginUrl = this.baseUrl + 'login.php';
  publicKeyUrl = this.baseUrl + 'get_public_key.php';
  refreshLoginToken = this.baseUrl + 'refresh_token.php';
  categoriesUrl = this.baseUrl  + 'categories/';
  adsUrl = this.baseUrl  + 'ads/';
  offersUrl = this.baseUrl  + 'offers/';
  offersProductsUrl = this.baseUrl  + 'offers_products/';

  notificationsUrl = this.baseUrl  + 'notifications/';
  productsUrl = this.baseUrl  + 'products/';
  productsGroupsUrl = this.baseUrl  + 'products_groups/';
  productsImagesUrl = this.baseUrl  + 'products_images/';
  deliverMenUrl = this.baseUrl  + 'delivery_men/';
  usersUrl = this.baseUrl  + 'users/';





  // category_url = this.baseUrl + this.base2Url + 'categories/';
  // delivery_men_url = this.baseUrl + this.base2Url + 'delivery_men/';

  // projectsAdsUrl = this.baseUrl + this.base2Url + 'projects_ads/';

  // products_url = this.baseUrl + this.base2Url + 'products/';
  // notification_url = this.baseUrl + this.base2Url + 'projects_notifications/';
  // order_url = this.baseUrl + this.base2Url + 'orders/';
  // projects_managers_url = this.baseUrl + this.base2Url + 'projects_managers/';

  // permissions_url = this.baseUrl + this.base2Url + 'permissions/';
  // money_transfers_url = this.baseUrl + this.base2Url + 'money_transfers/';
  // money_collectors_url = this.baseUrl + this.base2Url + 'money_collectors/';

  // projects_url = this.baseUrl + this.base2Url + 'projects/';

  // projects_currencies = this.baseUrl + this.base2Url + 'projects_currencies/';

  // orders_products_url = this.baseUrl + this.base2Url + 'orders_products/';

  // devices_sessions_url = this.baseUrl + this.base2Url + 'devices_sessions/';
  // projects_user_url = this.baseUrl + this.base2Url + 'projects_users/';
  // users_credits_url = this.baseUrl + this.base2Url + 'users_credits/';
  // users_url = this.baseUrl + this.base2Url + 'users/';

  // payment_voucher_url = this.baseUrl + this.base2Url + 'payment_voucher/';

  // products_images_url = this.baseUrl + this.base2Url + 'products_images/';

  localServer = 'http://localhost/store/';
  catUrl = this.localServer + 'categories/';
}
