import * as React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TRootContainerParamList, {ERootContainerRoutes} from './types.ts';
import Orders from '../containers/Orders.tsx';

const RootStack = createNativeStackNavigator<TRootContainerParamList>();

const Root = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name={ERootContainerRoutes.Orders}
          component={Orders}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
