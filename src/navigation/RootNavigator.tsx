import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createStaticNavigation,
  type StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { use } from 'react';
import { StyleSheet, Text } from 'react-native';

import { INITIAL_HEAVY_LOADING_STRATEGY } from '@/features/heavy/heavyLoadingStrategy';
import { fonts } from '@/shared/utils/fonts';

import { DeviceCompromised } from './screens/DeviceCompromised';
import { ForceUpdate } from './screens/ForceUpdate';
import { Home } from './screens/Home';
import { Loading } from './screens/Loading';
import { Maintenance } from './screens/Maintenance';
import { NotFound } from './screens/NotFound';
import { RootNavigationStackContext } from './startup/RootNavigationStackProvider';
import type { useRootNavigationStack } from './startup/useRootNavigationStack';

const HeavyScreen =
  INITIAL_HEAVY_LOADING_STRATEGY === 'eager'
    ? require('./screens/Settings').Settings
    : require('./screens/LazySettings').LazySettings;

const styles = StyleSheet.create({
  scene: {
    backgroundColor: '#e7edf4',
  },
  tabBar: {
    backgroundColor: '#ffffff',
    borderTopWidth: 0,
    elevation: 0,
    height: 72,
    paddingBottom: 10,
    paddingTop: 8,
  },
  tabBarLabel: {
    fontFamily: fonts.regular,
    fontSize: 12,
    letterSpacing: 0.2,
  },
  tabBarLabelActive: {
    fontFamily: fonts.semiBold,
  },
  tabIcon: {
    fontSize: 20,
  },
});

const MainStack = createBottomTabNavigator({
  screenOptions: {
    headerShown: false,
    sceneStyle: styles.scene,
    tabBarActiveTintColor: '#002548',
    tabBarInactiveTintColor: '#94a3b8',
    tabBarLabel: ({ children, color, focused }) => (
      <Text
        style={[
          styles.tabBarLabel,
          focused && styles.tabBarLabelActive,
          { color },
        ]}
      >
        {children}
      </Text>
    ),
    tabBarStyle: styles.tabBar,
  },
  // biome-ignore assist/source/useSortedKeys: We want to keep the order of the tabs as defined here, so we disable the sorting of keys
  screens: {
    Home: {
      options: {
        tabBarIcon: ({ color, focused: isFocused, size }) => {
          return (
            <Text style={[styles.tabIcon, { color, lineHeight: size }]}>
              {isFocused ? '▲' : '△'}
            </Text>
          );
        },
      },
      screen: Home,
    },
    Heavy: {
      options: {
        tabBarIcon: ({ color, focused: isFocused, size }) => {
          return (
            <Text style={[styles.tabIcon, { color, lineHeight: size }]}>
              {isFocused ? '■' : '□'}
            </Text>
          );
        },
      },
      screen: HeavyScreen,
    },
  },
});

function whenStack(stack: ReturnType<typeof useRootNavigationStack>) {
  return () => use(RootNavigationStackContext).current === stack;
}

const RootStack = createNativeStackNavigator({
  screenOptions: {
    contentStyle: styles.scene,
    headerShown: false,
  },
  screens: {
    DeviceCompromised: {
      if: whenStack('DeviceCompromised'),
      screen: DeviceCompromised,
    },
    ForceUpdate: {
      if: whenStack('ForceUpdate'),
      screen: ForceUpdate,
    },
    Loading: {
      if: whenStack('Loading'),
      screen: Loading,
    },
    MainStack: {
      if: whenStack('Main'),
      screen: MainStack,
    },
    Maintenance: {
      if: whenStack('Maintenance'),
      screen: Maintenance,
    },
    NotFound: {
      linking: {
        path: '*',
      },
      screen: NotFound,
    },
  },
});

export const RootNavigator = createStaticNavigation(RootStack);

export type RootStackParamList = StaticParamList<typeof RootStack>;
export type RootStackName = keyof RootStackParamList;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
