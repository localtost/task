const BASE_URL = 'https://api.dev.gastrojames.ch/api/test/';

//----ORDERS-----//
const getOrdersURL = 'order-get';
const buyOrderURL = (restaurantId: string, qrCodeName: string) =>
  `order-pay?restaurantId=${restaurantId}&qrCodeName=${qrCodeName}`;
//--------------//

export {BASE_URL, getOrdersURL, buyOrderURL};
