import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SplashScreen from 'react-native-splash-screen';
import { UserStore } from './stores/UserStore';
import Menu from './components/menu/Menu';
import AppNavigator from './navigation/AppNavigator';
import { LocationService } from './services/LocationService';
import { Image } from 'react-native';

interface Props {
  navigation: any;
}

interface State {
  stackNavigation: any;
  appReady: boolean;
}

const userStore: UserStore = new UserStore();
const locationService: LocationService = new LocationService();
const Drawer = createDrawerNavigator();

export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      stackNavigation: '',
      appReady: false,
    };

    setTimeout(
      () =>
        this.setState({
          appReady: true,
        }),
      3500
    );
  }

  // TODO refactor with state management
  async UNSAFE_componentWillMount(): Promise<void> {
    SplashScreen.hide();
    await userStore.setup();
  }

  setStackNavigator = (stackNavigation: any) => {
    if (this.state.stackNavigation === '') {
      this.setState({ stackNavigation });
    }
  };

  render() {
    if (this.state.appReady) {
      return (
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Home"
            drawerStyle={{
              width: '85%',
            }}
            drawerContent={(props) => (
              <Menu
                userStore={userStore}
                {...props}
                stackNavigation={this.state.stackNavigation}
              />
            )}
          >
            <Drawer.Screen name="Home">
              {(props) => (
                <AppNavigator
                  userStore={userStore}
                  locationService={locationService}
                  setStackNavigation={this.setStackNavigator}
                  {...props}
                />
              )}
            </Drawer.Screen>
          </Drawer.Navigator>
        </NavigationContainer>
      );
    } else {
      return (
        <Image
          source={require('../assets/Elko.gif')}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
          resizeMode={'cover'}
        />
      );
    }
  }
}
