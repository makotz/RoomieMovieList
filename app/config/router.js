import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

// import Feed from '../screens/Feed';
import Settings from '../screens/Settings';
import Movies from '../screens/Movies';
import UserDetail from '../screens/UserDetail';
import MovieDetail from '../screens/MovieDetail';
// import Me from '../screens/Me';
import Me2 from '../screens/Me2';


export const FeedStack = StackNavigator({
  Feed: {
    screen: Movies,
    navigationOptions: {
      title: 'Movies',
    },
  },
  MovieDetails: {
    screen: MovieDetail,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.title}`,
    }),
  },
});

export const Tabs = TabNavigator({
  Me: {
    screen: Me2,
    navigationOptions: {
      tabBarLabel: 'Me',
      tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
    },
  },
  Feed: {
    screen: FeedStack,
    navigationOptions: {
      tabBarLabel: 'Movies',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
    },
  },
});

export const SettingsStack = StackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'Settings',
    },
  },
});

export const Root = StackNavigator({
  Tabs: {
    screen: Tabs,
  },
  Settings: {
    screen: SettingsStack,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});
