import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TRootContainerParamList, {ERootContainerRoutes} from './types.ts';
import OrdersContainer from '../containers/Orders.tsx';
import {useAppSelector} from '../redux/types.ts';
import {orders} from '../redux/rtkq/orders.rtkq.ts';
import {Palette} from '../theme';
import {fontAdaptive} from '../helpers/adaptive.ts';

const RootStack = createStackNavigator<TRootContainerParamList>();

const Root = () => {
  const {data} = useAppSelector(orders.endpoints.getOrders.select());
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          options={{
            headerTitleAlign: 'left',
            headerTitle: data?.restaurantName,
            headerTitleStyle: {
              fontWeight: '700',
              fontSize: fontAdaptive(24),
              color: Palette.violet,
            },
            headerShadowVisible: false,
          }}
          name={ERootContainerRoutes.Orders}
          component={OrdersContainer}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
