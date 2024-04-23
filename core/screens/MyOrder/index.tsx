import {Alert, Text} from 'react-native';
import * as React from 'react';
import {useCallback, useMemo, useState} from 'react';
import OrdersFooter from '../../components/OrdersFooter';
import {EStatuses, TMyOrder, TDish} from '../../redux/rtkq/types.ts';
import OrderScreenView from '../../components/OrderScreenView';
import OrderElement from '../../components/OrderElement';
import Styles from './styles.ts';
import {FlashList} from '@shopify/flash-list';
import SelectWithText from '../../components/SelectAllOrders';

type TMyOrderProps = {
  myOrder: TMyOrder;
  buyMyOrder: (body: any) => void;
};

const MyOrder: React.FC<TMyOrderProps> = ({myOrder, buyMyOrder}) => {
  const [myOrderData, setMyOrderData] = useState<TMyOrder>(myOrder);
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false);

  const computed = useMemo(() => {
    return {
      totalPrice: myOrderData?.orderItems?.reduce(
        (acc, item) => (acc += item.price),
        0,
      ),
      totalPayQuantity: myOrderData?.orderItems?.filter(el => el.isActive)
        ?.length,

      totalPayAmount: myOrderData?.orderItems
        ?.filter(el => el.isActive)
        .reduce((acc, item) => (acc += item.price), 0),
    };
  }, [myOrderData?.orderItems]);

  const onDeleteItemButtonPress = useCallback(
    (id: string) => {
      const filteredItems = myOrderData?.orderItems.filter(el => el.id !== id);

      setMyOrderData({...myOrderData, orderItems: filteredItems});
    },
    [myOrderData],
  );

  const onPayButtonPress = () => {
    const selectedDishes = myOrderData.orderItems.filter(el => el.isActive);

    if (
      isSelectedAll ||
      selectedDishes.length === myOrderData.orderItems.length
    ) {
      buyMyOrder({ordersToPay: [myOrderData.id], itemsToPay: []});

      return;
    }

    if (selectedDishes.length && !isSelectedAll) {
      buyMyOrder({
        ordersToPay: [],
        itemsToPay: selectedDishes.map(dish => ({
          orderId: myOrderData.id,
          itemId: dish.id,
        })),
      });
    } else {
      Alert.alert('Select Items to pay');
    }
  };

  const onSelectAllButtonPress = () => {
    setIsSelectedAll(!isSelectedAll);
    setMyOrderData(prevState => ({
      ...prevState,
      orderItems: prevState.orderItems.map(el => ({
        ...el,
        isActive: !isSelectedAll,
      })),
    }));
  };

  const onDishCheckBoxPress = useCallback(
    (item: TDish) => {
      const newOrderItems = myOrderData.orderItems.map(el => {
        if (el.id === item.id) {
          return {
            ...el,
            isActive: !item.isActive,
          };
        }
        return el;
      });
      setIsSelectedAll(false);

      setMyOrderData(prevState => ({
        ...prevState,
        orderItems: newOrderItems,
      }));
    },
    [myOrderData.orderItems],
  );

  const onRemoveDishAmount = useCallback(
    (item: TDish) => {
      const initialDish = myOrder?.orderItems?.find(el => el.id === item.id);
      const transformedArray = myOrderData.orderItems.map(el => {
        if (el.id === item.id) {
          if (el.amount === 1) {
            return el;
          }
          return {
            ...item,
            amount: el.amount - 1,
            price: el.price - initialDish!.price,
          };
        }
        return el;
      });

      setMyOrderData(prevState => ({
        ...prevState,
        orderItems: transformedArray,
      }));
    },
    [myOrder?.orderItems, myOrderData.orderItems],
  );
  const onAddDishAmount = useCallback(
    (item: TDish) => {
      const initialDish = myOrder?.orderItems?.find(el => el.id === item.id);
      const transformedArray = myOrderData.orderItems.map(el => {
        if (el.id === item.id) {
          return {
            ...item,
            amount: el.amount + 1,
            price: el.price + initialDish!.price,
          };
        }
        return el;
      });

      setMyOrderData(prevState => ({
        ...prevState,
        orderItems: transformedArray,
      }));
    },
    [myOrder?.orderItems, myOrderData.orderItems],
  );

  const renderTitle = (item: TDish) => {
    switch (item.status) {
      case EStatuses.InProgress: {
        return <Text style={Styles.sectionStyle}>In Progress</Text>;
      }
      case EStatuses.New: {
        return <Text style={Styles.sectionStyle}>New</Text>;
      }
      case EStatuses.Ready: {
        return <Text style={Styles.sectionStyle}>Ready</Text>;
      }
    }
  };

  const renderItem = useCallback(
    ({item: dish}: {item: TDish}) => {
      return (
        <React.Fragment>
          {renderTitle(dish)}

          <OrderElement
            dishPrice={dish.price}
            dishAmount={dish.amount}
            dishName={dish.name}
            isDishActive={dish.isActive}
            dishStatus={dish.status}
            onRemoveDishAmount={() => onRemoveDishAmount(dish)}
            onDishCheckBoxPress={() => onDishCheckBoxPress(dish)}
            onDeleteItemButtonPress={() => onDeleteItemButtonPress(dish.id)}
            onAddDishAmount={() => onAddDishAmount(dish)}
          />
        </React.Fragment>
      );
    },
    [
      onAddDishAmount,
      onDeleteItemButtonPress,
      onDishCheckBoxPress,
      onRemoveDishAmount,
    ],
  );

  return (
    <OrderScreenView>
      <SelectWithText
        onCheckBoxPress={onSelectAllButtonPress}
        isSelected={isSelectedAll}
        title={isSelectedAll ? 'UnSelect all' : 'Select all'}
      />

      <FlashList
        showsVerticalScrollIndicator={false}
        estimatedItemSize={100}
        data={myOrderData?.orderItems}
        renderItem={renderItem}
      />

      <OrdersFooter
        totalPayQuantity={computed.totalPayQuantity}
        totalPayAmount={Number(computed.totalPayAmount?.toFixed(2))}
        onButtonPress={onPayButtonPress}
        itemQuantity={myOrderData?.orderItems?.length}
        totalAmount={Number(computed.totalPrice?.toFixed(2))}
      />
    </OrderScreenView>
  );
};

export default MyOrder;
