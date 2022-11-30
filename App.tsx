import "react-native-gesture-handler";
import { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import Feather from "@expo/vector-icons/Feather";
import * as Font from "expo-font";
import {
  useFonts,
  Nunito_400Regular as NunitoRegular,
  Nunito_700Bold as NunitoBold,
} from "@expo-google-fonts/nunito";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import Navigator from "./src/navigation";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#FAFAFA",
  },
};

function cacheFonts(fonts: any) {
  return fonts.map((font: any) => Font.loadAsync(font));
}

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  async function _loadFonts() {
    const iconFontAssets = cacheFonts([Feather.font]);
    await Promise.all([...iconFontAssets]);
  }

  let [fontsLoaded] = useFonts({
    NunitoRegular,
    NunitoBold,
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await _loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer theme={MyTheme}>
      {/* <View onLayout={onLayoutRootView}> */}
        <Navigator />
        <StatusBar style="auto" />
      {/* </View> */}
    </NavigationContainer>
  );
}
