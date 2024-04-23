import {Alert, View} from 'react-native';
import * as React from 'react';
import OrdersFooter from '../../components/OrdersFooter';
import {TAllOrders, TDish, TOrder} from '../../redux/rtkq/types.ts';
import OrderScreenView from '../../components/OrderScreenView';
import {useCallback, useMemo, useState} from 'react';
import {FlashList} from '@shopify/flash-list';
import OrderElement from '../../components/OrderElement';
import SelectWithText from '../../components/SelectAllOrders';

type TMyOrderProps = {
  allOrders: TAllOrders | undefined;
  buyMyOrder: (body: any) => void;
};

const AllOrders: React.FC<TMyOrderProps> = ({allOrders, buyMyOrder}) => {
  const [allOrderData, setAllOrderData] = useState<TAllOrders | undefined>(
    allOrders,
  );
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false);

  const totalAmount = useMemo(() => {
    return allOrderData?.reduce((acc, cur) => {
      cur.orderItems.map(dish => {
        acc += dish.price;
      });
      return acc;
    }, 0);
  }, [allOrderData]);

  const totalAmountToPay = allOrderData?.reduce((acc, order) => {
    const activeItemsToPay = order.orderItems.filter(dish => dish.isActive);

    activeItemsToPay.forEach(dish => {
      acc += dish.price;
    });

    return acc;
  }, 0);

  const totalQuantityToPay = allOrderData?.reduce((acc, order) => {
    const activeItemsToPay = order.orderItems.filter(dish => dish.isActive);

    acc += activeItemsToPay.length;

    return acc;
  }, 0);

  const itemQuantity = useMemo(() => {
    return allOrderData?.reduce(
      (acc, order) => (acc += order?.orderItems?.length),
      0,
    );
  }, [allOrderData]);

  const onOrderPressCheckboxPress = useCallback(
    (item: TOrder) => {
      const transformedArray = allOrderData?.map(order => {
        if (order.id === item.id) {
          return {
            ...order,
            isActive: !item.isActive,
            orderItems: item.orderItems.map(dish => ({
              ...dish,
              isActive: !item.isActive,
            })),
          };
        }
        return order;
      });

      setIsSelectedAll(false);

      setAllOrderData(transformedArray);
    },
    [allOrderData],
  );

  const onDishCheckBoxPress = useCallback(
    (dish: TDish) => {
      setIsSelectedAll(false);
      const transformArray = allOrderData?.map(order => {
        if (order.id === dish.orderId) {
          const newDishes = order.orderItems.map(el => {
            if (el.id === dish.id) {
              return {
                ...el,
                isActive: !el.isActive,
              };
            }
            return el;
          });
          return {
            ...order,
            isActive:
              newDishes.filter(item => item.isActive).length ===
              order.orderItems.length,
            orderItems: newDishes,
          };
        }
        return order;
      });

      setAllOrderData(transformArray);
    },
    [allOrderData],
  );

  const onBuyAllOrdersButtonPress = () => {
    const selectedOrders = allOrderData
      ?.filter(order => order.isActive)
      ?.map(order => order.id);

    const selectedDishes = allOrderData
      ?.filter(order => !order?.isActive)
      .reduce<Array<{orderId: string; itemId: string}>>((acc, value) => {
        value.orderItems.map(el => {
          if (el.isActive) {
            acc.push({orderId: el.orderId, itemId: el.id});
          }
        });

        return acc;
      }, []);

    if (!selectedOrders?.length && !selectedDishes?.length) {
      Alert.alert('Select Items to pay');

      return;
    }

    buyMyOrder({
      ordersToPay: selectedOrders,
      itemsToPay: selectedDishes,
    });
  };

  const onSelectAllCheckboxPress = useCallback(() => {
    setIsSelectedAll(!isSelectedAll);
    const toSelectAll = allOrderData?.map(order => ({
      ...order,
      isActive: !isSelectedAll,
      orderItems: order.orderItems.map(el => ({
        ...el,
        isActive: !isSelectedAll,
      })),
    }));

    setAllOrderData(toSelectAll);
  }, [allOrderData, isSelectedAll]);

  const addDishAmount = useCallback(
    (dish: TDish) => {
      const findOrder = allOrders?.find(el => el.id === dish.orderId);

      const initialDish = findOrder?.orderItems.find(
        el => el.id === dish.id,
      ) as TDish;

      const transformedArray = allOrderData?.map(el => {
        if (el.id === dish.orderId) {
          return {
            ...el,
            orderItems: el.orderItems.map(item => {
              if (item.id === dish.id) {
                return {
                  ...item,
                  amount: item.amount + 1,
                  price: item.price + initialDish?.price,
                };
              }
              return item;
            }),
          };
        }

        return el;
      });

      setAllOrderData(transformedArray);
    },
    [allOrderData, allOrders],
  );
  const onDeleteDishButtonPress = useCallback((dish: TDish) => {
    setAllOrderData(prevState => {
      return prevState?.map(el => {
        if (el.id === dish.orderId) {
          return {
            ...el,
            orderItems: el.orderItems.filter(
              dishItem => dishItem.id !== dish.id,
            ),
          };
        }
        return el;
      });
    });
  }, []);

  const renderItem = useCallback(
    ({item}: {item: TOrder}) => {
      return (
        <View>
          <SelectWithText
            onCheckBoxPress={() => onOrderPressCheckboxPress(item)}
            isSelected={item.isActive}
            title={`№ ${item.orderNumber}`}
          />
          {item.orderItems.map(dish => {
            return (
              <OrderElement
                key={dish.id}
                dishStatus={dish.status}
                isDishActive={dish.isActive}
                dishName={dish.name}
                dishPrice={dish.price}
                dishAmount={dish.amount}
                onRemoveDishAmount={() => {}}
                onDeleteItemButtonPress={() => onDeleteDishButtonPress(dish)}
                onAddDishAmount={() => addDishAmount(dish)}
                onDishCheckBoxPress={() => onDishCheckBoxPress(dish)}
              />
            );
          })}
        </View>
      );
    },
    [
      addDishAmount,
      onDeleteDishButtonPress,
      onDishCheckBoxPress,
      onOrderPressCheckboxPress,
    ],
  );

  return (
    <OrderScreenView>
      <SelectWithText
        onCheckBoxPress={onSelectAllCheckboxPress}
        isSelected={isSelectedAll}
        title={isSelectedAll ? 'UnSelect all' : 'Select all'}
      />
      <FlashList
        showsVerticalScrollIndicator={false}
        data={allOrderData}
        estimatedItemSize={100}
        renderItem={renderItem}
      />
      <OrdersFooter
        totalPayQuantity={Number(totalQuantityToPay?.toFixed(2))}
        totalPayAmount={Number(totalAmountToPay?.toFixed(2))}
        onButtonPress={onBuyAllOrdersButtonPress}
        itemQuantity={itemQuantity}
        totalAmount={Number(totalAmount?.toFixed(2))}
      />
    </OrderScreenView>
  );
};

export default AllOrders;
