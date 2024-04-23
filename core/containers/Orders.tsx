import * as React from 'react';
import {useCallback, useMemo} from 'react';
import {Alert, useWindowDimensions} from 'react-native';
import {
  NavigationState,
  SceneRendererProps,
  TabBar,
  TabView,
} from 'react-native-tab-view';
import {Palette} from '../theme';
import {
  useBuyOrderMutation,
  useGetOrdersQuery,
} from '../redux/rtkq/orders.rtkq.ts';
import {EOrderTabKeys, TOrderTabRoutes} from '../config/types.ts';
import SubHeader from '../components/SubHeader';
import MyOrder from '../screens/MyOrder';
import AllOrders from '../screens/AllOrders';

const OrderTabRoutes: TOrderTabRoutes = [
  {key: EOrderTabKeys.MyOrder, title: 'My order'},
  {key: EOrderTabKeys.AllOrders, title: 'All orders'},
];

const OrdersContainer = () => {
  const layout = useWindowDimensions();
  const {data, isSuccess} = useGetOrdersQuery();

  const [buyOrder] = useBuyOrderMutation();
  const [index, setIndex] = React.useState<number>(0);
  const [routes] = React.useState<TOrderTabRoutes>(OrderTabRoutes);

  const subHeaderTitle = useMemo(() => {
    return index === 0
      ? `${data?.qrCodeName} / № ${data?.myOrder.orderNumber}`
      : `${data?.qrCodeName}`;
  }, [index, data?.qrCodeName, data?.myOrder.orderNumber]);

  const buyMyOrder = async (body: any) => {
    try {
      await buyOrder({
        restaurantId: data?.restaurantId as string,
        qrCodeName: data?.qrCodeName as string,
        body,
      }).unwrap();
    } catch (e: any) {
      Alert.alert(e?.data?.title ?? e?.data);
    }
  };

  const renderScene = useCallback(
    ({
      route,
    }: {
      route: {
        key: keyof typeof EOrderTabKeys;
        title: string;
      };
    }) => {
      switch (route.key) {
        case EOrderTabKeys.MyOrder: {
          return <MyOrder myOrder={data!.myOrder} buyMyOrder={buyMyOrder} />;
        }

        case EOrderTabKeys.AllOrders: {
          return <AllOrders allOrders={data?.orders} buyMyOrder={buyMyOrder} />;
        }

        default: {
          return null;
        }
      }
    },
    [data],
  );

  const renderTabBar = useCallback(
    (
      props: SceneRendererProps & {
        navigationState: NavigationState<{key: string; title: string}>;
      },
    ) => (
      <TabBar
        {...props}
        indicatorStyle={{backgroundColor: Palette.violet}}
        style={{backgroundColor: Palette.white}}
        activeColor={Palette.violet}
        inactiveColor={Palette.lightViolet}
      />
    ),
    [],
  );

  if (!isSuccess) {
    return null;
  }

  return (
    <React.Fragment>
      <SubHeader title={subHeaderTitle} />
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </React.Fragment>
  );
};

export default OrdersContainer;
