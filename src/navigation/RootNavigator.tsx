import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createStaticNavigation,
  type StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { use } from 'react';
import { StyleSheet, Text } from 'react-native';

import { INITIAL_HEAVY_LOADING_STRATEGY } from '@/features/heavy/heavyLoadingStrategy';

import { RootNavigationStackContext } from './NavigationStackProvider';
import { ForceUpdate } from './screens/ForceUpdate';
import { Home } from './screens/Home';
import { Loading } from './screens/Loading';
import { NotFound } from './screens/NotFound';
import type { useNavigationStack } from './useNavigationStack';

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
    fontFamily: 'SpaceGrotesk_600SemiBold',
    fontSize: 11,
    letterSpacing: 0.2,
  },
  tabIcon: {
    fontSize: 18,
  },
});

const MainStack = createBottomTabNavigator({
  screenOptions: {
    headerShown: false,
    sceneStyle: styles.scene,
    tabBarActiveTintColor: '#002548',
    tabBarInactiveTintColor: '#94a3b8',
    tabBarLabelStyle: styles.tabBarLabel,
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

function whenStack(stack: ReturnType<typeof useNavigationStack>) {
  return () => use(RootNavigationStackContext).current === stack;
}

const RootStack = createNativeStackNavigator({
  screenOptions: {
    contentStyle: styles.scene,
  },
  screens: {
    ForceUpdate: {
      if: whenStack('ForceUpdate'),
      options: {
        headerShown: false,
      },
      screen: ForceUpdate,
    },
    Loading: {
      if: whenStack('Loading'),
      options: {
        headerShown: false,
      },
      screen: Loading,
    },
    MainStack: {
      if: whenStack('Main'),
      options: {
        headerShown: false,
      },
      screen: MainStack,
    },
    NotFound: {
      linking: {
        path: '*',
      },
      options: {
        headerShown: false,
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
