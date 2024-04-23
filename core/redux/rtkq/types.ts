export enum EStatuses {
  New = 0,
  InProgress = 1,
  Ready = 2,
}
type TStatus = EStatuses.New | EStatuses.Ready | EStatuses.InProgress;

export type TOrder = {
  id: string;
  orderNumber: number;
  isPaid: boolean;
  isActive: boolean;
  totalAmount: number;
  orderItems: Array<TDish>;
};

export type TAllOrders = Array<TOrder>;

export type TDish = {
  amount: number;
  id: string;
  orderId: string;
  isPaid: boolean;
  name: string;
  isActive: boolean;
  price: number;
  status: TStatus;
};

export type TMyOrder = {
  id: string;
  orderNumber: number;
  isPaid: boolean;
  totalAmount: number;
  orderItems: Array<TDish>;
  status: keyof EStatuses;
};

export type TOrders = {
  restaurantId: string;
  restaurantName: string;
  qrCodeName: string;
  myOrder: TMyOrder;
  orders: TAllOrders;
};
