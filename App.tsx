import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import LogInScreen from "./screens/LogInScreen";

import * as SplashScreen from "expo-splash-screen";

import { Provider } from "react-redux";
import { store } from "./store/store";

import { useFonts } from "expo-font";
import { useEffect } from "react";

const Stack = createStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    bold: require("./assets/quicksand/static/Quicksand-Bold.ttf"),
    Medium: require("./assets/quicksand/static/Quicksand-Medium.ttf"),
    Light: require("./assets/quicksand/static/Quicksand-Light.ttf"),
  });

  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync();
    };
    prepare();
  }, []);

  if (!loaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animationEnabled: false,
          }}
        >
          <Stack.Screen name="Home" component={LogInScreen} />
          <Stack.Screen
            name="Main"
            component={HomeScreen}
            options={{ gestureEnabled: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
