import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL, buyOrderURL, getOrdersURL} from '../../api/endpoints.ts';
import {TOrders} from './types.ts';

export const orders = createApi({
  reducerPath: 'orders',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: builder => ({
    getOrders: builder.query<TOrders, void>({
      query: () => getOrdersURL,
      transformResponse(baseQueryReturnValue: TOrders) {
        return {
          ...baseQueryReturnValue,
          myOrder: {
            ...baseQueryReturnValue.myOrder,
            orderItems: baseQueryReturnValue.myOrder.orderItems.map(dish => ({
              ...dish,
              isActive: false,
            })),
          },
          orders: baseQueryReturnValue.orders.map(order => ({
            ...order,
            orderItems: order.orderItems.map(dish => ({
              ...dish,
              orderId: order.id,
              isActive: false,
            })),
          })),
        };
      },
    }),
    buyOrder: builder.mutation<
      void,
      {restaurantId: string; qrCodeName: string; body: any}
    >({
      query({restaurantId, qrCodeName, body}) {
        return {
          url: buyOrderURL(restaurantId, qrCodeName),
          method: 'POST',
          body,
        };
      },
    }),
  }),
});

export const {useGetOrdersQuery, useBuyOrderMutation} = orders;
